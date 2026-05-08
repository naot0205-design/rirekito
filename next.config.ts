import type { NextConfig } from "next";

const securityHeaders = [
  // HTTPS強制（Vercel本番のみ有効。プレビュー環境では無視される）
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // クリックジャッキング対策
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // MIME sniffing対策
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // リファラ送信を最小限に
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // ブラウザAPIのアクセス制限
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // XSS対策（モダンブラウザでは Content-Security-Policy 推奨だが、CSPは別途厳密設計が必要）
  // ここではシンプルに既知ヘッダーのみ
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
