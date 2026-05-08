# リレキト ハンドオフメモ

最終更新: 2026-05-08

このドキュメントは、新しいセッションに作業を引き継ぐためのメモです。

---

## アプリ概要

- **名称**: リレキト
- **本番URL**: https://rirekito.vercel.app/
- **リポジトリ**: https://github.com/naot0205-design/rirekito
- **ローカルパス**: `~/resume-app`
- **概要**: 事務職転職向けの履歴書作成ツール。診断 → 自己PR自動生成 → 履歴書PDF出力。
- **状態**: 本番デプロイ済み・基本機能完成

## 技術スタック

- Next.js 16.2.5 (App Router, Turbopack)
- TypeScript
- Tailwind CSS
- @react-pdf/renderer (PDF生成)
- @ai-sdk/anthropic + Claude Haiku 4.5 (自己PRブラッシュアップ)
- Sawarabi Mincho フォント (履歴書PDF用)
- Vercel ホスティング

## ターゲット・コアバリュー

- **ターゲット**: 第二新卒女性（事務職転職希望者）
- **差別化**:
  - 自己診断 → 自己PR自動生成のフロー
  - PCなしでスマホで完結する手軽さ
  - SNS/インフルエンサーマーケティングで競合がいない領域

---

## 事業モデル（重要・決定済み）

**フリーミアム → リード収益化型**

```
[フリー履歴書ツール] ← SNS/インフルエンサー集客
       ↓
   求職者リスト構築（事務職志望の第二新卒女性）
       ↓
[B2B] 採用マーケ支援として企業に販売
```

- ユーザーには完全無料で履歴書作成サービスを提供
- メアドと履歴書情報を収集してリスト化
- **提携先（有料職業紹介事業の許可保有企業）と組んで求人紹介**
- 提携先は未定。リストが集まってから決める方針
- マネタイズ目標: 副業として月数万〜数十万円

### 法的整理

- 自社では有料職業紹介事業の許可は取らない
- 提携先（許可保有企業）経由で求職者を紹介
- 個人情報保護法対応:
  - サーバ保存に方針転換（ピボット必要）
  - 提携先への情報提供には**明示的なオプトイン同意**が必須
  - チェックボックスは**プリセットOFF**にすること（適正取得要件）

---

## ピボット計画（次のセッションで進める作業）

現在: 「サーバ保存しないツール型」 → 移行先: 「リスト構築型」

### Phase 1（最優先・所要 半日〜1日）
**メアド収集 + リスト化の最小実装**

1. Supabase アカウント作成（無料）
2. プロジェクト作成・DB接続情報取得
3. `users` `resumes` テーブル作成（SQL は別途）
4. `/api/register` エンドポイント実装
5. メアド入力フォーム追加（**Step4のPDFダウンロードボタン直前**で同意取得）
6. プライバシーポリシー全面改訂
7. Vercel に環境変数追加
8. デプロイ確認

### Phase 2（マイページ機能・所要 2〜3日）
- Supabase Auth で Magic Link ログイン
- 過去の履歴書保存・再編集
- 退会・データ削除セルフサービス

### Phase 3（提携先決定後）
- ポリシーに提携先の具体名追加
- CSV出力 or Webhook で提携先に求職者情報を送る仕組み

---

## DB スキーマ（Phase 1 想定）

```sql
-- 求職者
users:
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid()
  email        TEXT UNIQUE NOT NULL
  created_at   TIMESTAMPTZ DEFAULT NOW()
  consent_partner_referral  BOOLEAN DEFAULT FALSE  -- 提携先への提供同意
  consent_marketing         BOOLEAN DEFAULT FALSE  -- メルマガ等

-- 履歴書データ
resumes:
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid()
  user_id         UUID REFERENCES users(id) ON DELETE CASCADE
  data            JSONB NOT NULL                  -- 履歴書全項目
  diagnosis_type  TEXT                            -- StaffType
  created_at      TIMESTAMPTZ DEFAULT NOW()

-- 送客記録（Phase 3 で利用）
referrals:
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid()
  user_id     UUID REFERENCES users(id)
  partner_id  UUID
  sent_at     TIMESTAMPTZ DEFAULT NOW()
  status      TEXT
```

Row Level Security 必須（個人情報保護法対応のため）。

---

## メアド入力タイミング（決定済み）

**Step4 履歴書プレビューの「PDFをダウンロード」ボタンを押した瞬間**に、メアド入力モーダルを出す。

- 価値受け取り直前なので登録率が一番高い
- 「PDFを受け取るためにメアドが必要」と自然に説明可能
- メアド未登録でもPDFを出せる選択肢を残す（離脱防止）

同意UI:
- ☑️ **必須**: 利用規約・プライバシーポリシーに同意する
- ☐ **任意**: 提携する有料職業紹介事業者から求人案内を受け取る（デフォルトOFF）

---

## 完了済みの実装

### 機能
- 4ステップフロー（基本情報 → 診断 → 結果 → 履歴書PDF）
- 6タイプの診断 + 求人表示（ルールベース・AIなし）
- 自己PRテンプレート + AIブラッシュアップ
- PDF出力（JIS規格スタイル + 顔写真）
- モバイル対応（Step2スクロール、生年月日入力幅、PDFプレビュー新規タブ方式）
- iOS/Android別の保存方法ヘルプ

### 法務・セキュリティ
- プライバシーポリシー（保有期間・削除請求・インシデント対応・問い合わせ窓口）
- 利用規約
- HTTPセキュリティヘッダー (HSTS, X-Frame-Options, CSP系)
- AIプロンプトインジェクション対策（入力サニタイズ・長さ制限・ホワイトリスト検証）
- レート制限（5/分・10/時・20/日、IP単位）★ ただし**インメモリ実装**なので本番Vercelでは要永続化（Upstash Redis等）

### 運営者情報
- 運営者: 土元 直
- 連絡先: nao.t19970205@gmail.com

---

## 残課題（後で対応する優先度低めの項目）

### 中
- レート制限の永続化（Upstash Redis 等）
- インシデント時連絡経路の詳細化

### 低
- 単体・結合テスト整備（Playwright）
- 監視ツール導入（Sentry）
- コストモニタリング（Anthropic API 予算アラート）
- カスタムドメイン取得（rirekito.com / .jp は取得可能、未取得）

### 低（マネタイズ展開後）
- SEO/OGP メタタグ強化
- Google Analytics or Vercel Analytics 導入
- ファーストビュー改善（コンバージョン率向上）

---

## 次セッションでの最初の指示例

```
~/resume-app の HANDOFF.md を読んだうえで、ピボット計画の Phase 1
（メアド収集+Supabase連携）を進めて。Supabase アカウント作成手順から
案内してほしい。
```

---

## 参考: 開発の流儀

- ローカル: `cd ~/resume-app && npm run dev`
- 本番反映: `git push` で Vercel が自動デプロイ
- 環境変数: `.env.local` (gitignore済み) と Vercel ダッシュボードの両方を更新する必要あり
- 動作確認: ブラウザMCPで自動テスト可能（モバイル実機テストは不可、ユーザーに依頼）
