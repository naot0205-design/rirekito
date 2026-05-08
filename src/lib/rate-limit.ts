// IPベースのレート制限（インメモリ・スライディングウィンドウ）
// 注意：単一プロセスのインメモリのため、Vercel本番では @upstash/redis などに差し替える必要あり

type Window = { count: number; resetAt: number };
type Store = Map<string, Window>;

const minuteStore: Store = new Map();
const hourStore: Store = new Map();
const dayStore: Store = new Map();

const LIMITS = {
  minute: { max: 5, windowMs: 60 * 1000 },
  hour: { max: 10, windowMs: 60 * 60 * 1000 },
  day: { max: 20, windowMs: 24 * 60 * 60 * 1000 },
} as const;

function check(store: Store, key: string, max: number, windowMs: number): { ok: boolean; resetAt: number } {
  const now = Date.now();
  const w = store.get(key);
  if (!w || w.resetAt < now) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { ok: true, resetAt };
  }
  if (w.count >= max) {
    return { ok: false, resetAt: w.resetAt };
  }
  w.count++;
  return { ok: true, resetAt: w.resetAt };
}

// 期限切れエントリの掃除（メモリリーク防止）。1分ごとにstaleなキーを削除
let cleanupTimer: NodeJS.Timeout | null = null;
function startCleanup() {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    [minuteStore, hourStore, dayStore].forEach((store) => {
      for (const [key, w] of store) {
        if (w.resetAt < now) store.delete(key);
      }
    });
  }, 60 * 1000);
  // unrefがあればプロセス終了を妨げないよう設定
  if (typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    (cleanupTimer as { unref: () => void }).unref();
  }
}
startCleanup();

export type RateLimitResult =
  | { ok: true }
  | { ok: false; retryAfterSec: number; reason: "minute" | "hour" | "day" };

export function rateLimit(ip: string): RateLimitResult {
  const m = check(minuteStore, ip, LIMITS.minute.max, LIMITS.minute.windowMs);
  if (!m.ok) return { ok: false, retryAfterSec: Math.ceil((m.resetAt - Date.now()) / 1000), reason: "minute" };

  const h = check(hourStore, ip, LIMITS.hour.max, LIMITS.hour.windowMs);
  if (!h.ok) return { ok: false, retryAfterSec: Math.ceil((h.resetAt - Date.now()) / 1000), reason: "hour" };

  const d = check(dayStore, ip, LIMITS.day.max, LIMITS.day.windowMs);
  if (!d.ok) return { ok: false, retryAfterSec: Math.ceil((d.resetAt - Date.now()) / 1000), reason: "day" };

  return { ok: true };
}

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const xri = req.headers.get("x-real-ip");
  if (xri) return xri.trim();
  return "unknown";
}
