import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

interface RegisterBody {
  email: string;
  consentPartnerReferral: boolean;
  consentMarketing: boolean;
  resumeData: Record<string, unknown>;
  diagnosisType: string;
}

export async function POST(req: NextRequest) {
  let body: RegisterBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { email, consentPartnerReferral, consentMarketing, resumeData, diagnosisType } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "メールアドレスが正しくありません。" }, { status: 400 });
  }

  // upsert: 同じメールが既にあれば同意フラグのみ更新
  const { data: user, error: upsertError } = await supabaseAdmin
    .from("users")
    .upsert(
      { email, consent_partner_referral: consentPartnerReferral, consent_marketing: consentMarketing },
      { onConflict: "email" }
    )
    .select("id")
    .single();

  if (upsertError || !user) {
    console.error("register upsert error:", upsertError);
    return NextResponse.json({ error: "保存に失敗しました。" }, { status: 500 });
  }

  const { error: resumeError } = await supabaseAdmin.from("resumes").insert({
    user_id: user.id,
    data: resumeData,
    diagnosis_type: diagnosisType,
  });

  if (resumeError) {
    console.error("register resume insert error:", resumeError);
    // 履歴書保存失敗はユーザーには見せない（メアド登録は成功しているため）
  }

  return NextResponse.json({ ok: true });
}
