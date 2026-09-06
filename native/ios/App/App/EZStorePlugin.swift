import Foundation
import Capacitor
import StoreKit

// The store, spoken to directly (Frank, 5 Sep 2026: no middleman).
//
// Written against Apple's StoreKit documentation read that day: Product.products(for:),
// Product.purchase(options:) with the appAccountToken option, Product.PurchaseResult,
// Transaction.currentEntitlements, Transaction.updates, Transaction.finish(),
// AppStore.sync() (Restore Purchases, only ever on a tap), and
// AppStore.showManageSubscriptions(in:).
//
// The app sets the family's hidden billing id as the appAccountToken on every
// purchase; Apple hands the same UUID back in every server notification for
// that subscription, which is how api/plan.js knows which family paid. This
// phone's own view of the purchase (currentEntitlements) is reported to the
// app as "premium" so the phone that bought it works at once, before the
// server has heard.
//
// THE EMERGENCY BUTTON NEVER READS ANY OF THIS. Hard rule.

@objc(EZStorePlugin)
public class EZStorePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "EZStorePlugin"
    public let jsName = "EZStore"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "status", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "products", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "purchase", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "restore", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "manage", returnType: CAPPluginReturnPromise)
    ]

    private var updates: Task<Void, Never>?

    public override func load() {
        // Apple: start listening as soon as the app launches, or unfinished
        // transactions (Ask to Buy, a purchase made on another device) are missed.
        updates = Task(priority: .background) { [weak self] in
            for await result in Transaction.updates {
                if case .verified(let transaction) = result {
                    await transaction.finish()
                }
                let status = await EZStorePlugin.currentStatus()
                self?.notifyListeners("change", data: status)
            }
        }
    }

    deinit { updates?.cancel() }

    // The newest live auto-renewable entitlement on this Apple Account.
    static func currentStatus() async -> [String: Any] {
        var best: Transaction? = nil
        for await result in Transaction.currentEntitlements {
            guard case .verified(let t) = result else { continue }
            guard t.productType == .autoRenewable, t.revocationDate == nil else { continue }
            let tExp = t.expirationDate ?? Date.distantPast
            let bExp = best?.expirationDate ?? Date.distantPast
            if best == nil || tExp > bExp { best = t }
        }
        var out: [String: Any] = ["available": true, "premium": best != nil]
        if let t = best {
            out["productId"] = t.productID
            out["originalTransactionId"] = String(t.originalID)
            if let e = t.expirationDate { out["expiresAt"] = Int(e.timeIntervalSince1970 * 1000) }
            if let tok = t.appAccountToken { out["appAccountToken"] = tok.uuidString.lowercased() }
            if #available(iOS 16.0, *) { out["environment"] = t.environment.rawValue }
        }
        return out
    }

    @objc func status(_ call: CAPPluginCall) {
        Task { call.resolve(await EZStorePlugin.currentStatus()) }
    }

    @objc func products(_ call: CAPPluginCall) {
        guard let ids = call.getArray("ids", String.self), !ids.isEmpty else { call.reject("ids required"); return }
        Task {
            do {
                let products = try await Product.products(for: ids)
                call.resolve(["products": products.map { p -> [String: Any] in
                    ["id": p.id, "displayName": p.displayName, "displayPrice": p.displayPrice, "description": p.description]
                }])
            } catch {
                call.reject("products_failed", nil, error)
            }
        }
    }

    @objc func purchase(_ call: CAPPluginCall) {
        guard let productId = call.getString("productId"), !productId.isEmpty else { call.reject("productId required"); return }
        let token = call.getString("appAccountToken") ?? ""
        Task { @MainActor in
            do {
                guard let product = try await Product.products(for: [productId]).first else { call.reject("no_product"); return }
                var options: Set<Product.PurchaseOption> = []
                if let uuid = UUID(uuidString: token) { options.insert(.appAccountToken(uuid)) }
                let result = try await product.purchase(options: options)
                switch result {
                case .success(let verification):
                    switch verification {
                    case .verified(let transaction):
                        await transaction.finish()
                        var status = await EZStorePlugin.currentStatus()
                        status["outcome"] = "success"
                        call.resolve(status)
                    case .unverified:
                        call.resolve(["outcome": "unverified", "premium": false, "available": true])
                    }
                case .pending:
                    call.resolve(["outcome": "pending", "premium": false, "available": true])
                case .userCancelled:
                    call.resolve(["outcome": "cancelled", "premium": false, "available": true])
                @unknown default:
                    call.resolve(["outcome": "unknown", "premium": false, "available": true])
                }
            } catch {
                call.reject("purchase_failed", nil, error)
            }
        }
    }

    @objc func restore(_ call: CAPPluginCall) {
        // Apple: sync() shows a sign-in prompt, so only ever from a tap.
        Task {
            do {
                try await AppStore.sync()
                call.resolve(await EZStorePlugin.currentStatus())
            } catch {
                call.reject("restore_failed", nil, error)
            }
        }
    }

    @objc func manage(_ call: CAPPluginCall) {
        Task { @MainActor in
            let scenes = UIApplication.shared.connectedScenes
            let scene = (scenes.first { $0.activationState == .foregroundActive } ?? scenes.first) as? UIWindowScene
            guard let windowScene = scene else { call.reject("no_scene"); return }
            do {
                try await AppStore.showManageSubscriptions(in: windowScene)
                call.resolve()
            } catch {
                call.reject("manage_failed", nil, error)
            }
        }
    }
}
