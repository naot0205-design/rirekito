import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { StaffType } from "@/types";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  // レート制限チェック（5/分、10/時、20/日）
  const ip = getClientIp(req);
  const rl = rateLimit(ip);
  if (!rl.ok) {
    const labels = { minute: "1分", hour: "1時間", day: "1日" } as const;
    return new Response(
      JSON.stringify({
        error: `${labels[rl.reason]}あたりの利用上限に達しました。${rl.retryAfterSec}秒後に再度お試しください。`,
        retryAfterSec: rl.retryAfterSec,
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Retry-After": String(rl.retryAfterSec),
        },
      }
    );
  }

  const {
    currentPR,
    userStrengths,
    staffType,
  }: { currentPR: string; userStrengths: string; staffType: StaffType } = await req.json();

  const result = streamText({
    model: anthropic("claude-haiku-4-5-20251001"),
    onError: ({ error }) => {
      const e = error as { message?: string; url?: string; statusCode?: number; responseBody?: string; data?: unknown };
      console.error("[brushup-pr] streamText error:", {
        message: e.message,
        url: e.url,
        statusCode: e.statusCode,
        responseBody: e.responseBody,
        data: e.data,
      });
    },
    prompt: `あなたは事務職専門の転職エージェントです。
以下のベース自己PRを、応募者が入力した強み・経験をもとにブラッシュアップしてください。

【応募者のタイプ】
${staffType}

【現在の自己PR】
${currentPR}

【応募者が入力した強み・経験】
${userStrengths}

【要件】
- 200〜250字で収める
- 応募者が入力した具体的なエピソードや強みを自然に盛り込む
- 事務職らしい誠実・丁寧な文体を維持する
- 「私は〜」で始め、「貴社でも〜」で締める
- 自己PRのテキストのみ出力する（説明や前置き不要）`,
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of result.textStream) {
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      } catch (e) {
        console.error("[brushup-pr] stream error:", e);
        controller.error(e);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
