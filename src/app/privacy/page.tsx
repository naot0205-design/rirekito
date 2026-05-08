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
          <p className="text-xs text-gray-500 mt-1">最終更新日:2026年5月8日</p>
        </header>

        <section className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p>
            本サービス「リレキト」(以下「本サービス」)における個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
          </p>
        </section>

        <section className="space-y-2 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-900">1. 取得する情報</h2>
          <p>本サービスでは、ユーザーが履歴書を作成するために以下の情報を入力していただきます:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>氏名・フリガナ・生年月日・性別</li>
            <li>住所・電話番号・メールアドレス</li>
            <li>学歴・職歴・資格情報</li>
            <li>顔写真(任意)</li>
            <li>自己診断の回答</li>
            <li>自己PR文章(ブラッシュアップ機能利用時)</li>
          </ul>
          <p className="text-gray-600">
            <strong>利用目的:</strong> 履歴書PDFの生成、自己PR文章の最適化、サービス改善のための統計分析。
          </p>
        </section>

        <section className="space-y-2 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-900">2. 情報の保存・保有期間について</h2>
          <p>
            ユーザーが入力した個人情報は、原則として本サービスのサーバーには保存されません。情報はお使いのブラウザ上でのみ処理され、ブラウザを閉じる、もしくはページをリロードした時点で消去されます。
          </p>
          <p>
            <strong>保有期間:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>ブラウザ内データ:ユーザーセッション中のみ(ブラウザを閉じれば消去)</li>
            <li>サーバログ(IPアドレス・アクセス時刻):最大90日間。レート制限・障害調査のため</li>
            <li>外部AIサービスに送信されたテキスト:Anthropic社の規約に従う(同社では原則として顧客データをモデル学習に使用せず、最大30日間で削除されます)</li>
          </ul>
        </section>

        <section className="space-y-2 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-900">3. 外部サービスへの送信</h2>
          <p>
            自己PRブラッシュアップ機能を利用される際、入力された自己PR文章および強み・経験のテキスト情報は、生成AIサービス(Anthropic社が提供するClaude)に送信されます。当該データの取り扱いについては、各サービスのプライバシーポリシーをご確認ください。
          </p>
          <p>
            なお、氏名・住所・電話番号などの個人を特定可能な情報は、外部AIサービスには送信されません。
          </p>
        </section>

        <section className="space-y-2 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-900">4. Cookie・アクセス解析</h2>
          <p>
            本サービスでは、サービス改善のためアクセス解析ツール(Google Analytics等)を利用する場合があります。これにより取得されるデータは匿名であり、個人を特定するものではありません。
          </p>
        </section>

        <section className="space-y-2 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-900">5. 第三者への提供</h2>
          <p>
            本サービスは、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
          </p>
        </section>

        <section className="space-y-2 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-900">6. 開示・訂正・削除請求について</h2>
          <p>
            個人情報保護法に基づき、ユーザーはご自身の個人情報の開示・訂正・利用停止・削除を請求できます。
          </p>
          <p>
            本サービスは原則としてサーバ側にユーザーの個人情報を保有しませんが、サーバログに含まれるIPアドレスやアクセス記録の削除をご希望の場合は、下記の問い合わせ窓口までご連絡ください。
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>削除請求の対象:サーバログ内の該当ユーザーに関する記録</li>
            <li>請求方法:メールに「データ削除請求」と明記してご連絡ください</li>
            <li>対応期限:原則として2週間以内に対応・回答いたします</li>
          </ul>
        </section>

        <section className="space-y-2 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-900">7. インシデント発生時の対応</h2>
          <p>
            個人情報の漏洩・滅失・毀損等のインシデントが発生した場合、速やかに事実関係を調査し、本サービス上での公表および影響を受けるユーザーへの通知を行います。重大事案については個人情報保護委員会への報告も実施します。
          </p>
        </section>

        <section className="space-y-2 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-900">8. 改定について</h2>
          <p>
            本ポリシーは、必要に応じて改定する場合があります。重要な変更がある場合は、本サービス上でお知らせします。
          </p>
        </section>

        <section className="space-y-2 text-sm text-gray-700 leading-relaxed">
          <h2 className="text-lg font-semibold text-gray-900">9. お問い合わせ・各種請求窓口</h2>
          <p>
            本ポリシー、データ削除請求、その他のお問い合わせは以下までご連絡ください。原則として5営業日以内に一次回答いたします。
          </p>
          <p className="text-gray-700 bg-gray-50 border border-gray-200 rounded-lg p-3">
            運営者:土元 直<br />
            連絡先:<a href="mailto:nao.t19970205@gmail.com" className="text-blue-600 hover:underline">nao.t19970205@gmail.com</a><br />
            対応時間:平日10:00〜18:00(土日祝・年末年始を除く)
          </p>
        </section>
      </article>
    </main>
  );
}
