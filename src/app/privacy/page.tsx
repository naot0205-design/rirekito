import Link from "next/link";

export const metadata = {
  title: "プライバシーポリシー | リレキト",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <article className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <header>
          <Link href="/" className="text-sm text-blue-600 hover:underline">← トップに戻る</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-3">プライバシーポリシー</h1>
          <p className="text-xs text-gray-500 mt-1">最終更新日：2026年5月8日</p>
        </header>

        <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>
            本サービス「リレキト」（以下「本サービス」）における個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
          </p>
        </section>

        <section className="space-y-2 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-900">1. 取得する情報</h2>
          <p>本サービスでは、ユーザーが履歴書を作成するために以下の情報を入力していただきます：</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>氏名・フリガナ・生年月日・性別</li>
            <li>住所・電話番号・メールアドレス</li>
            <li>学歴・職歴・資格情報</li>
            <li>顔写真（任意）</li>
            <li>自己診断の回答</li>
            <li>自己PR文章（ブラッシュアップ機能利用時）</li>
          </ul>
        </section>

        <section className="space-y-2 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-900">2. 情報の保存について</h2>
          <p>
            ユーザーが入力した個人情報は、原則として本サービスのサーバーには保存されません。情報はお使いのブラウザ上でのみ処理され、PDF出力後はブラウザを閉じることで消去されます。
          </p>
        </section>

        <section className="space-y-2 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-900">3. 外部サービスへの送信</h2>
          <p>
            自己PRブラッシュアップ機能を利用される際、入力された自己PR文章および強み・経験のテキスト情報は、生成AIサービス（Anthropic社が提供するClaude）に送信されます。当該データの取り扱いについては、各サービスのプライバシーポリシーをご確認ください。
          </p>
          <p>
            なお、氏名・住所・電話番号などの個人を特定可能な情報は、外部AIサービスには送信されません。
          </p>
        </section>

        <section className="space-y-2 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-900">4. Cookie・アクセス解析</h2>
          <p>
            本サービスでは、サービス改善のためアクセス解析ツール（Google Analytics等）を利用する場合があります。これにより取得されるデータは匿名であり、個人を特定するものではありません。
          </p>
        </section>

        <section className="space-y-2 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-900">5. 第三者への提供</h2>
          <p>
            本サービスは、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
          </p>
        </section>

        <section className="space-y-2 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-900">6. 改定について</h2>
          <p>
            本ポリシーは、必要に応じて改定する場合があります。重要な変更がある場合は、本サービス上でお知らせします。
          </p>
        </section>

        <section className="space-y-2 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-900">7. お問い合わせ</h2>
          <p>本ポリシーに関するお問い合わせは、以下までご連絡ください：</p>
          <p className="text-gray-500">
            運営者：土元 直<br />
            連絡先：nao.t19970205@gmail.com
          </p>
        </section>
      </article>
    </main>
  );
}
