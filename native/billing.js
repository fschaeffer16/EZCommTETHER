// The billing bridge for the native store shells. Injected into index.html
// by native/build.js ONLY when the build runs with EZ_BILLING=1 — the web
// app, the PWA, and store builds without the flag never carry this code.
//
// It implements the window.__EZ_BILLING contract that demo.html reads:
//
//   configured  true once the store SDK initialized; until then (and on any
//               failure) it stays false and the app treats itself as
//               unlocked. Fail-open on purpose: a billing outage must never
//               take a feature from someone who paid.
//   premium     whether the "premium" entitlement is active right now.
//   purchase(done)  opens the store's own purchase sheet (price shown by the
//                   store, never by us), then done(errOrNull).
//   restore(done)   restores prior purchases (Apple requires this button).
//   manage()        opens the store's subscription management screen.
//   onChange(fn)    called whenever entitlement state changes.
//
// Backed by RevenueCat (@revenuecat/purchases-capacitor), which fronts both
// StoreKit and Google Play Billing with one entitlement model, and can later
// share entitlements with web (Stripe) purchases. The API keys are public
// SDK keys (safe to embed); they are injected by build.js from the
// EZ_RC_KEY_IOS / EZ_RC_KEY_ANDROID environment variables, so no key lives
// in the repo. The entitlement identifier is "premium" and the offering is
// RevenueCat's "default" offering — configure both in the RevenueCat
// dashboard (APPSTORE.md walks through it).
//
// THE EMERGENCY BUTTON NEVER READS ANY OF THIS. Hard rule.

(function () {
  'use strict';

  var listeners = [];
  var B = {
    configured: false,
    premium: false,
    purchase: function (done) { if (done) done('not_ready'); },
    restore: function (done) { if (done) done('not_ready'); },
    manage: function () {},
    onChange: function (fn) { if (typeof fn === 'function') listeners.push(fn); },
  };
  window.__EZ_BILLING = B;

  function emit() {
    for (var i = 0; i < listeners.length; i++) { try { listeners[i](); } catch (e) {} }
  }

  function boot() {
    var cap = window.Capacitor;
    var P = cap && cap.Plugins && cap.Plugins.Purchases;
    if (!P) return; // plugin not in this build: stay unconfigured = unlocked

    var key = null;
    try {
      var platform = cap.getPlatform ? cap.getPlatform() : '';
      if (platform === 'ios') key = window.__EZ_RC_KEY_IOS || null;
      else if (platform === 'android') key = window.__EZ_RC_KEY_ANDROID || null;
    } catch (e) {}
    if (!key) return; // no key injected for this platform: stay unlocked

    function apply(customerInfo) {
      try {
        var ent = customerInfo && customerInfo.entitlements && customerInfo.entitlements.active;
        var was = B.premium;
        B.premium = !!(ent && ent.premium);
        B.configured = true;
        if (was !== B.premium) emit();
      } catch (e) {}
    }

    P.configure({ apiKey: key })
      .then(function () {
        try {
          P.addCustomerInfoUpdateListener(function (info) { apply(info); });
        } catch (e) {}
        return P.getCustomerInfo();
      })
      .then(function (r) {
        apply(r && r.customerInfo);
        B.configured = true;
        emit();
      })
      .catch(function () { /* stay unconfigured = unlocked */ });

    B.purchase = function (done) {
      P.getOfferings()
        .then(function (o) {
          var cur = o && o.current;
          var pkg = cur && cur.availablePackages && cur.availablePackages[0];
          if (!pkg) throw new Error('no_offering');
          return P.purchasePackage({ aPackage: pkg });
        })
        .then(function (r) { apply(r && r.customerInfo); if (done) done(B.premium ? null : 'not_entitled'); })
        .catch(function (e) {
          // A cancelled sheet is not an error worth showing.
          var cancelled = e && (e.userCancelled || /cancel/i.test(String(e.message || e)));
          if (done) done(cancelled ? null : 'purchase_failed');
        });
    };

    B.restore = function (done) {
      P.restorePurchases()
        .then(function (r) { apply(r && r.customerInfo); if (done) done(B.premium ? null : 'nothing_restored'); })
        .catch(function () { if (done) done('restore_failed'); });
    };

    B.manage = function () {
      // The customer manages the subscription where they bought it.
      try {
        var platform = cap.getPlatform ? cap.getPlatform() : '';
        var url = platform === 'android'
          ? 'https://play.google.com/store/account/subscriptions'
          : 'https://apps.apple.com/account/subscriptions';
        window.open(url, '_blank');
      } catch (e) {}
    };
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();
