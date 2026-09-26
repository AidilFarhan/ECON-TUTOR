/* =========================================================
   Econ Tutor · Routing Middleware Vercel
   Semua kandungan memerlukan kuki sesi yang sah dan email dalam
   senarai akses. Hanya halaman log masuk dan asetnya dibuka.
   ========================================================= */
import { ambilKuki, bacaSesi, dibenarkan } from "./lib/sesi.js";

const TERBUKA = [
  /^\/masuk(\.html)?$/,
  /^\/api\/sesi$/,
  /^\/assets\/css\/style\.css$/,
  /^\/assets\/favicon\.svg$/,
  /^\/favicon\.ico$/,
  /^\/assets\/js\/masuk\.js$/,
  /^\/assets\/js\/firebase-config\.js$/,
  /^\/assets\/js\/vendor\/firebase-auth-[\w.-]+\.js$/
];

// Sama seperti next() daripada @vercel/functions: teruskan ke fail statik atau fungsi.
function teruskan() {
  return new Response(null, { headers: { "x-middleware-next": "1" } });
}

function halaman(url) {
  return url.pathname === "/" || url.pathname.endsWith(".html") || !/\.[a-z0-9]+$/i.test(url.pathname);
}

export default async function middleware(req) {
  const url = new URL(req.url);
  if (TERBUKA.some((r) => r.test(url.pathname))) return teruskan();

  const sesi = await bacaSesi(ambilKuki(req.headers.get("cookie")), process.env.RAHSIA_SESI);
  if (sesi && dibenarkan(sesi.email, process.env.EMAIL_DIBENARKAN)) return teruskan();

  if ((req.method === "GET" || req.method === "HEAD") && halaman(url)) {
    const ke = url.pathname === "/" || url.pathname === "/index.html" ? "" : "?ke=" + encodeURIComponent(url.pathname + url.search);
    return new Response(null, { status: 302, headers: { location: "/masuk.html" + ke, "cache-control": "no-store" } });
  }
  return new Response("Sila log masuk.", { status: 401, headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" } });
}
