const courses = [
  { id: 1, name: "Webアプリケーション", category: "開発", level: "初級" },
  { id: 2, name: "Cloudflare Workers", category: "インフラ", level: "中級" },
  { id: 3, name: "UIデザイン", category: "デザイン", level: "初級" }
];

const events = [
  { id: 1, title: "Workers ハンズオン", date: "2026-10-03", place: "オンライン" },
  { id: 2, title: "Web制作相談会", date: "2026-10-17", place: "HAL東京" }
];

function json(data, status, request, env) {
  const allowedOrigin = env.ALLOWED_ORIGIN || "*";
  const requestOrigin = request.headers.get("Origin");
  const allowOrigin = allowedOrigin === "*" || allowedOrigin === requestOrigin ? allowedOrigin : "null";
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "access-control-allow-origin": allowOrigin,
      "access-control-allow-methods": "GET, OPTIONS",
      "access-control-allow-headers": "Content-Type",
      "vary": "Origin"
    }
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return json({}, 204, request, env);
    if (request.method !== "GET") return json({ error: "Method not allowed" }, 405, request, env);
    if (url.pathname === "/" || url.pathname === "/api") return json({ service: "ih12b203-api", status: "ok" }, 200, request, env);
    if (url.pathname === "/api/course") return json({ courses }, 200, request, env);
    if (url.pathname === "/api/fortune") return json({ date: new Date().toISOString().slice(0, 10), result: "大吉", message: "小さな一歩が、よい流れを作ります。" }, 200, request, env);
    if (url.pathname === "/api/events") return json({ events }, 200, request, env);
    if (url.pathname === "/api/hello") {
      const name = url.searchParams.get("name")?.trim();
      if (!name) return json({ error: "name is required" }, 400, request, env);
      return json({ message: `こんにちは、${name}さん！` }, 200, request, env);
    }
    return json({ error: "Not found" }, 404, request, env);
  }
};