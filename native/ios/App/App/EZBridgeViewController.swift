import UIKit
import Capacitor

// The app's own view controller: Capacitor's, plus the store plugin. It is
// registered here rather than as a package so it lives in this repo.
class EZBridgeViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(EZStorePlugin())
    }
}
