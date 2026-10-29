#!/usr/bin/env node
/* ============================================================
   Saves every product photo in assets/products.js locally and
   rewrites the catalogue to use the local copies.

   Usage (Node 18 or newer, from the project root):
     node tools/fetch-product-images.js

   Safe to run more than once: files that already exist are kept.
   ============================================================ */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dataFile = path.join(root, 'assets', 'products.js');
const outDir = path.join(root, 'assets', 'products');

const window = {};
new Function('window', fs.readFileSync(dataFile, 'utf8'))(window);
const products = window.SPY_PRODUCTS || [];

fs.mkdirSync(outDir, { recursive: true });

function extFor(url, type) {
  if (/png/i.test(type)) return '.png';
  if (/webp/i.test(type)) return '.webp';
  if (/jpe?g/i.test(type)) return '.jpg';
  const m = url.split('?')[0].match(/\.(png|jpe?g|webp)$/i);
  return m ? '.' + m[1].toLowerCase().replace('jpeg', 'jpg') : '.jpg';
}

async function save(url, name) {
  if (!/^https?:/i.test(url)) return url;
  const existing = fs.readdirSync(outDir).find(f => f.startsWith(name + '.'));
  if (existing) return 'assets/products/' + existing;
  const res = await fetch(encodeURI(decodeURI(url)), { headers: { 'User-Agent': 'Mozilla/5.0 (Spybitech catalogue sync)' }, referrerPolicy: 'no-referrer' });
  if (!res.ok) throw new Error(res.status + ' ' + url);
  const file = name + extFor(url, res.headers.get('content-type') || '');
  fs.writeFileSync(path.join(outDir, file), Buffer.from(await res.arrayBuffer()));
  return 'assets/products/' + file;
}

(async () => {
  let source = fs.readFileSync(dataFile, 'utf8');
  let ok = 0, failed = 0;
  for (const p of products) {
    for (const key of ['img', 'kit']) {
      if (!p[key] || !/^https?:/i.test(p[key])) continue;
      try {
        const local = await save(p[key], p.id + (key === 'kit' ? '-kit' : ''));
        p[key + 'Local'] = local;
        ok++;
        console.log('saved   ', p.id, key, '->', local);
      } catch (e) {
        failed++;
        console.warn('skipped ', p.id, key, e.message);
      }
    }
  }
  // Rewrite each product's img/kit to the local file, keeping the remote URL as a comment for reference.
  for (const p of products) {
    for (const key of ['img', 'kit']) {
      if (!p[key + 'Local']) continue;
      const tail = key === 'img' ? ',\\s*fit:' : ',\\s*\\n';
      const block = new RegExp("(id: '" + p.id + "'[\\s\\S]*?\\b" + key + ":\\s*)(.+?)(" + tail + ")");
      source = source.replace(block, (m, a, b, c) => a + "'" + p[key + 'Local'] + "' /* was " + b.trim().replace(/\*\//g, '') + ' */' + c);
    }
  }
  fs.writeFileSync(dataFile, source);
  console.log('\nDone: ' + ok + ' images saved, ' + failed + ' skipped. assets/products.js now points at the local files.');
})();
