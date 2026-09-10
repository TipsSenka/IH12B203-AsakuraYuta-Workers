var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.js
var courses = [
  { id: 1, name: "Web\u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3", category: "\u958B\u767A", level: "\u521D\u7D1A" },
  { id: 2, name: "Cloudflare Workers", category: "\u30A4\u30F3\u30D5\u30E9", level: "\u4E2D\u7D1A" },
  { id: 3, name: "UI\u30C7\u30B6\u30A4\u30F3", category: "\u30C7\u30B6\u30A4\u30F3", level: "\u521D\u7D1A" }
];
var events = [
  { id: 1, title: "Workers \u30CF\u30F3\u30BA\u30AA\u30F3", date: "2026-10-03", place: "\u30AA\u30F3\u30E9\u30A4\u30F3" },
  { id: 2, title: "Web\u5236\u4F5C\u76F8\u8AC7\u4F1A", date: "2026-10-17", place: "HAL\u6771\u4EAC" }
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
__name(json, "json");
var index_default = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return json({}, 204, request, env);
    if (request.method !== "GET") return json({ error: "Method not allowed" }, 405, request, env);
    if (url.pathname === "/" || url.pathname === "/api") return json({ service: "ih12b203-api", status: "ok" }, 200, request, env);
    if (url.pathname === "/api/course") return json({ courses }, 200, request, env);
    if (url.pathname === "/api/fortune") return json({ date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), result: "\u5927\u5409", message: "\u5C0F\u3055\u306A\u4E00\u6B69\u304C\u3001\u3088\u3044\u6D41\u308C\u3092\u4F5C\u308A\u307E\u3059\u3002" }, 200, request, env);
    if (url.pathname === "/api/events") return json({ events }, 200, request, env);
    if (url.pathname === "/api/hello") {
      const name = url.searchParams.get("name")?.trim();
      if (!name) return json({ error: "name is required" }, 400, request, env);
      return json({ message: `\u3053\u3093\u306B\u3061\u306F\u3001${name}\u3055\u3093\uFF01` }, 200, request, env);
    }
    return json({ error: "Not found" }, 404, request, env);
  }
};
export {
  index_default as default
};
//# sourceMappingURL=index.js.map
