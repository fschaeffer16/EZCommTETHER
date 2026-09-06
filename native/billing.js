// The billing bridge for the iOS store shell. Injected into index.html by
// native/build.js ONLY when the build runs with EZ_BILLING=1 — the web app,
// the PWA, and store builds without the flag never carry this code.
//
// It implements the window.__EZ_BILLING contract that demo.html reads:
//
//   configured  true once the store plugin answered; until then (and on any
//               failure) it stays false and the app treats itself as
//               unlocked. Fail-open on purpose: a billing outage must never
//               take a feature from someone who paid.
//   premium     whether this Apple Account holds a live subscription. The
//               rest of the family is covered by the family's plan, which the
//               app reads from our server (api/home.js), not from here.
//   purchase(done)  opens the store's own purchase sheet (price shown by the
//                   store, never by us), then done(errOrNull).
//   restore(done)   Restore Purchases (Apple requires the button).
//   manage()        opens the store's subscription management sheet.
//   onChange(fn)    called whenever the store reports a change.
//   identify(id)    the family's hidden billing id. It is sent to Apple as the
//                   appAccountToken on the next purchase, and Apple returns it
//                   in every server notification for that subscription.
//
// Backed by StoreKit 2 directly through EZStorePlugin.swift in the native
// shell (Frank, 5 Sep 2026: no middleman). The product id is injected by
// build.js from EZ_PRODUCT_ID; nothing secret lives here.
//
// THE EMERGENCY BUTTON NEVER READS ANY OF THIS. Hard rule.

(function () {
  'use strict';

  var listeners = [];
  var familyId = null;
  var productId = window.__EZ_PRODUCT_ID || '';
  var B = {
    configured: false,
    premium: false,
    purchase: function (done) { if (done) done('not_ready'); },
    restore: function (done) { if (done) done('not_ready'); },
    manage: function () {},
    onChange: function (fn) { if (typeof fn === 'function') listeners.push(fn); },
    identify: function (id) { familyId = id || null; },
  };
  window.__EZ_BILLING = B;

  function emit() {
    for (var i = 0; i < listeners.length; i++) { try { listeners[i](); } catch (e) {} }
  }
  function apply(status) {
    try {
      var was = B.premium;
      B.premium = !!(status && status.premium);
      B.configured = true;
      if (was !== B.premium) emit();
    } catch (e) {}
  }

  function boot() {
    var cap = window.Capacitor;
    if (!cap || !productId) return;                  // no shell or no product: stay unlocked
    var P = null;
    try {
      if (cap.isPluginAvailable && !cap.isPluginAvailable('EZStore')) return;
      P = cap.registerPlugin ? cap.registerPlugin('EZStore') : (cap.Plugins && cap.Plugins.EZStore);
    } catch (e) { P = null; }
    if (!P) return;

    P.status().then(function (s) { apply(s); B.configured = true; emit(); }).catch(function () { /* stay unlocked */ });
    try { P.addListener('change', function (s) { apply(s); }); } catch (e) {}

    B.purchase = function (done) {
      P.purchase({ productId: productId, appAccountToken: familyId || '' })
        .then(function (s) {
          apply(s);
          var o = s && s.outcome;
          if (done) done(o === 'success' || o === 'cancelled' || o === 'pending' ? null : 'purchase_failed');
        })
        .catch(function () { if (done) done('purchase_failed'); });
    };
    B.restore = function (done) {
      P.restore()
        .then(function (s) { apply(s); if (done) done(B.premium ? null : 'nothing_restored'); })
        .catch(function () { if (done) done('restore_failed'); });
    };
    B.manage = function () {
      P.manage().catch(function () {
        try { window.open('https://apps.apple.com/account/subscriptions', '_blank'); } catch (e) {}
      });
    };
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') boot();
  else document.addEventListener('DOMContentLoaded', boot);
})();
