// EZvoxa finances: one set of formulas for the widget (finance.html) and the
// business plan document, so the two can never disagree (CLAUDE.md: the
// interactive model and the plan are one artifact in two forms).
//
// Everything here is arithmetic on inputs. The inputs, with where each one
// came from and whether it was verified, live in api/finance-defaults.json
// and are served only with the family password: no price is published
// until Frank confirms it.
//
// Runs in the browser (window.EZFinance) and in Node (module.exports).
(function (root) {
  'use strict';

  const round = (n) => Math.round(n);

  // One case, five years. Returns rows with unit counts beside every dollar.
  function project(inputs, scenario) {
    const p = inputs.prices, c = inputs.costs, a = inputs.assumptions;
    const years = scenario.years;              // [{buyers, subsEnd, districts, opex, districtSeats?, clinics?, clinicSeats?}] x5
    const rows = [];
    let cumulative = 0, subsPrev = 0;
    let tenDlcPaid = false, googlePaid = false;
    for (let i = 0; i < years.length; i++) {
      const y = years[i];
      // Institutional seats: districts times seats per district unless the
      // year names its seat count outright; clinics (8 Sep national case)
      // add their own seats and are priced the same way as schools.
      const districtSeats = y.districtSeats != null ? y.districtSeats : y.districts * scenario.seatsPerDistrict;
      const clinicSeats = y.clinicSeats || 0;
      const seats = districtSeats + clinicSeats;
      // Subscribers: revenue counts the average of the year's start and end.
      const subsAvg = (subsPrev + y.subsEnd) / 2;
      const talkerGross = y.buyers * p.talkerOneTime;
      const tetherGross = subsAvg * p.tetherMonthly * 12;
      const schoolGross = seats * (seats >= p.schoolVolumeSeats ? p.schoolVolume : p.schoolList);
      const storeGross = talkerGross + tetherGross;
      const storeFees = storeGross * c.storeCommission + schoolGross * (a.schoolsThroughStore ? c.storeCommission : 0);
      // RevenueCat: nothing to $2,500 tracked a month, then 1% of what it tracks.
      const monthlyTracked = storeGross / 12;
      const revenueCat = monthlyTracked >= c.revenueCatFreeMonthly ? storeGross * c.revenueCatRate : 0;
      const refunds = storeGross * c.refundRate;
      // Per-family cloud costs, on the average subscriber count.
      const familyMonths = subsAvg * 12;
      const textCost = familyMonths * a.textsPerFamilyPerMonth * c.textCostEach;
      const alertCost = (y.buyers + subsAvg) * a.alertsPerFamilyPerYear * c.alertCostEach;   // free feature, still costs us
      const voiceCost = familyMonths * c.voicePerFamilyMonth;
      const fixed = c.vercelMonthly * 12 + c.twilioNumberMonthly * 12 + c.appleDeveloperYearly + c.codemagicMonthly * 12
        + (tenDlcPaid ? 0 : c.tenDlcOneTime) + (googlePaid ? 0 : c.googlePlayOneTime);
      tenDlcPaid = true; googlePaid = true;
      const cloud = textCost + alertCost + voiceCost + fixed;
      const acquisition = y.buyers * c.acquisitionPerBuyer;
      const gross = storeGross + schoolGross;
      const costs = storeFees + revenueCat + refunds + cloud + acquisition + y.opex;
      const net = gross - costs;
      cumulative += net;
      // Per-channel view (8 Sep): the same numbers split by who paid.
      // Direct costs follow the sale they belong to; overhead (fixed and
      // operating) is shared out by each channel's share of sales.
      const seatPrice = seats > 0 ? schoolGross / seats : 0;
      const alertBuyers = y.buyers * a.alertsPerFamilyPerYear * c.alertCostEach;
      const ch = {
        talker: { units: y.buyers, sales: talkerGross, direct: talkerGross * c.storeCommission + (storeGross ? revenueCat * talkerGross / storeGross : 0) + talkerGross * c.refundRate + alertBuyers + acquisition },
        tether: { units: round(subsAvg), sales: tetherGross, direct: tetherGross * c.storeCommission + (storeGross ? revenueCat * tetherGross / storeGross : 0) + tetherGross * c.refundRate + textCost + voiceCost + (alertCost - alertBuyers) },
        schools: { units: districtSeats, sales: districtSeats * seatPrice, direct: districtSeats * seatPrice * (a.schoolsThroughStore ? c.storeCommission : 0) },
        clinics: { units: clinicSeats, sales: clinicSeats * seatPrice, direct: clinicSeats * seatPrice * (a.schoolsThroughStore ? c.storeCommission : 0) },
      };
      const overhead = fixed + y.opex;
      for (const k of Object.keys(ch)) {
        const x = ch[k];
        x.overhead = gross > 0 ? overhead * x.sales / gross : 0;
        x.gross = x.sales - x.direct;
        x.net = x.gross - x.overhead;
        x.expenses = x.direct + x.overhead;
        for (const f of ['sales', 'direct', 'overhead', 'gross', 'net', 'expenses']) x[f] = round(x[f]);
      }
      rows.push({
        channels: ch, overhead: round(overhead), direct: round(costs - overhead),
        year: i + 1, buyers: y.buyers, subsEnd: y.subsEnd, subsAvg: round(subsAvg), districts: y.districts, districtSeats, clinics: y.clinics || 0, clinicSeats, seats,
        talkerGross: round(talkerGross), tetherGross: round(tetherGross), schoolGross: round(schoolGross), gross: round(gross),
        storeFees: round(storeFees), revenueCat: round(revenueCat), refunds: round(refunds), cloud: round(cloud), acquisition: round(acquisition), opex: y.opex,
        net: round(net), cumulative: round(cumulative),
      });
      subsPrev = y.subsEnd;
    }
    const total = rows.reduce((t, r) => ({ buyers: t.buyers + r.buyers, gross: t.gross + r.gross, revenueCat: t.revenueCat + r.revenueCat, net: t.net + r.net }), { buyers: 0, gross: 0, revenueCat: 0, net: 0 });
    return { rows, total, subsEndYear5: years[years.length - 1].subsEnd };
  }

  function projectAll(inputs) {
    const out = {};
    for (const key of Object.keys(inputs.scenarios)) out[key] = project(inputs, inputs.scenarios[key]);
    return out;
  }

  const api = { project, projectAll };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.EZFinance = api;
})(typeof window !== 'undefined' ? window : globalThis);
