/* UK gift list service worker — scope is this folder (/costco-india-list/). */
const VERSION = "d236204271";
const SHELL = "gift-shell-" + VERSION;
const IMG = "gift-img-7a0e8c6c"; // changes only when an image file changes
const SHELL_URLS = ["./", "./index.html"];
const IMAGES = [
"img/adaptor.webp",
"img/ariel-pods.webp",
"img/baby-care.webp",
"img/baileys.webp",
"img/bath-towels.webp",
"img/batteries-aa.webp",
"img/batteries-aaa.webp",
"img/bin-bags.webp",
"img/blanket.webp",
"img/boots-no7.webp",
"img/celebrations.webp",
"img/cling.webp",
"img/clothes.webp",
"img/colgate.webp",
"img/cookingoil.webp",
"img/dates.webp",
"img/dettol-wipes.webp",
"img/disney-only.webp",
"img/dove.webp",
"img/eggs.webp",
"img/fairy-tabs.webp",
"img/fairy-wup.webp",
"img/ferrero-48.webp",
"img/ferrero-5pk.webp",
"img/ferrero-t26.webp",
"img/finish-tabs.webp",
"img/fm-biscuits.webp",
"img/fm-hamper.webp",
"img/fm-preserve.webp",
"img/fm-tea.webp",
"img/foil.webp",
"img/frozen.webp",
"img/gillette-home.webp",
"img/gillette.webp",
"img/gin.webp",
"img/glenfiddich.webp",
"img/ham-classic.webp",
"img/ham-soft.webp",
"img/handwash.webp",
"img/headphones.webp",
"img/heroes-roses.webp",
"img/hp-robe.webp",
"img/hp-wand.webp",
"img/hs-2in1.webp",
"img/hs-shampoo.webp",
"img/jl-beauty.webp",
"img/jl-home.webp",
"img/jl-waitrose.webp",
"img/jw-black.webp",
"img/jw-gold.webp",
"img/jw-green.webp",
"img/kids-vit.webp",
"img/kitchen-roll.webp",
"img/ks-almonds.webp",
"img/ks-belgian.webp",
"img/ks-cashews.webp",
"img/ks-coffee.webp",
"img/ks-dishpacs.webp",
"img/ks-fishoil.webp",
"img/ks-gluco.webp",
"img/ks-multi.webp",
"img/ks-pistachios.webp",
"img/ks-scotch.webp",
"img/ks-walnuts.webp",
"img/ks-wup.webp",
"img/lego.webp",
"img/lenor.webp",
"img/lib-beauty.webp",
"img/lib-print.webp",
"img/lindor-1kg.webp",
"img/lindor-4x.webp",
"img/lush-set.webp",
"img/milk.webp",
"img/mixed-nuts.webp",
"img/ms-biscuits.webp",
"img/ms-christmas.webp",
"img/ms-percy.webp",
"img/ms-tea.webp",
"img/nescafe.webp",
"img/nivea.webp",
"img/olay.webp",
"img/olive-oil.webp",
"img/oralb-brush.webp",
"img/oralb-paste.webp",
"img/perfume-m.webp",
"img/perfume-w.webp",
"img/persil-caps.webp",
"img/persil-powder.webp",
"img/pistachio-choc.webp",
"img/pk-east.webp",
"img/pk-kids.webp",
"img/pk-souvenir.webp",
"img/powerbank.webp",
"img/qstreet.webp",
"img/raisins.webp",
"img/rice.webp",
"img/saffron.webp",
"img/sf-british-beauty.webp",
"img/sf-burberry.webp",
"img/sf-foodhall-choco.webp",
"img/sf-hamper.webp",
"img/sf-jomalone.webp",
"img/sf-tea-biscuits.webp",
"img/sponges.webp",
"img/stores/apple.webp",
"img/stores/boots.webp",
"img/stores/costco.webp",
"img/stores/disney.webp",
"img/stores/fortnum.webp",
"img/stores/hamleys.webp",
"img/stores/hm.webp",
"img/stores/home.webp",
"img/stores/hp.webp",
"img/stores/jd.webp",
"img/stores/johnlewis.webp",
"img/stores/liberty.webp",
"img/stores/lush.webp",
"img/stores/ms.webp",
"img/stores/next.webp",
"img/stores/nike.webp",
"img/stores/oxford.webp",
"img/stores/primark-east.webp",
"img/stores/primark-ma.webp",
"img/stores/selfridges.webp",
"img/stores/uniqlo.webp",
"img/stores/waterstones.webp",
"img/stores/zara.webp",
"img/sure-men.webp",
"img/sure-women.webp",
"img/toblerone.webp",
"img/toilet.webp",
"img/towels.webp",
"img/toys.webp",
"img/twinings-eb.webp",
"img/twinings-eg.webp",
"img/vitd.webp",
"img/walkers.webp",
"img/watch.webp",
"img/wine.webp",
"img/ws-hp.webp",
"img/ws-london.webp",
"img/zoflora.webp"
];

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const s = await caches.open(SHELL);
    await Promise.all(SHELL_URLS.map(u => s.add(new Request(u, {cache: "reload"})).catch(() => {})));
    const i = await caches.open(IMG);
    await Promise.all(IMAGES.map(async u => { if(!(await i.match(u))) await i.add(u).catch(() => {}); }));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith("gift-") && k !== SHELL && k !== IMG).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin || !url.pathname.startsWith(new URL("./", location).pathname)) return;
  // Pages: network first (so updates show at once), cached copy when offline.
  if (req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith(".html")) {
    e.respondWith((async () => {
      try {
        const res = await fetch(req, {cache: "no-store"});
        if (res.ok) { const c = await caches.open(SHELL); c.put("./index.html", res.clone()); }
        return res;
      } catch (_) {
        const c = await caches.open(SHELL);
        return (await c.match("./index.html")) || (await c.match("./")) || Response.error();
      }
    })());
    return;
  }
  // Images: cache first, fill on miss.
  if (url.pathname.includes("/img/")) {
    e.respondWith((async () => {
      const c = await caches.open(IMG);
      const hit = await c.match(req, {ignoreSearch: true});
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok) c.put(req, res.clone());
      return res;
    })());
  }
});
