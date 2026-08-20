// Generates demo.html from index.html.
//
// Why a separate file at all: iOS "Add to Home Screen" reads the icon and the
// app name from the STATIC <head> tags, and ignores anything JavaScript changes
// after load. index.html's static tags are Evan's, so saving the ?template demo
// from it always installed Evan's app. demo.html is a byte-for-byte copy of the
// app with four head tags swapped to EZvoxa and one flag set, so a saved demo
// can only ever be EZvoxa — no runtime swap involved.
//
// demo.html is generated, never hand-edited. Re-run this after any change to
// index.html:  node make-demo.js

const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const src = fs.readFileSync(path.join(DIR, 'index.html'), 'utf8');

const swaps = [
  ['<title>Evan\'s Talker</title>', '<title>EZvoxa</title>'],
  ['<meta name="apple-mobile-web-app-title" content="Evan\'s Talker">', '<meta name="apple-mobile-web-app-title" content="EZvoxa">'],
  ['<link rel="manifest" href="manifest.webmanifest">', '<link rel="manifest" href="manifest-template.webmanifest">'],
  ['<link rel="apple-touch-icon" href="icon180.png">', '<link rel="apple-touch-icon" href="icon-ezvoxa-180.png">'],
  // Force template mode before the boot script runs, so the demo is the demo at
  // a plain URL with no ?template to strip.
  ['<script>\n// Adding the demo to a home screen', '<script>window.__EZ_FORCE_TEMPLATE = true;</script>\n<script>\n// Adding the demo to a home screen'],
];

let out = src;
for (const [from, to] of swaps) {
  if (!out.includes(from)) {
    console.error('make-demo: anchor not found -> ' + JSON.stringify(from.slice(0, 60)));
    process.exit(1);
  }
  out = out.replace(from, to);
}

// A banner so nobody hand-edits the generated file.
out = out.replace('<!DOCTYPE html>', '<!DOCTYPE html>\n<!-- GENERATED FROM index.html BY make-demo.js — DO NOT EDIT. Run: node make-demo.js -->');

fs.writeFileSync(path.join(DIR, 'demo.html'), out);
console.log('wrote demo.html (' + out.length + ' bytes)');
