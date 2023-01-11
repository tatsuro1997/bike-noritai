import Head from "next/head";
import NewSpot from "@/components/input/new-spot";
import Script from "next/script";

const CreateSpotPage = () => (
  <>
    <Head>
      <title>バイクノリタイ - スポット登録</title>
      <meta
        name="description"
        content="バイカー向けスポット検索サイト「バイクノリタイ」は全国〇〇箇所のスポットを掲載中。条件検索からあなたにピッタリのスポットが見つかります！"
      />
    </Head>
    {/* FIXME: 下記のようなScriptの使い方が推奨されているが警告がでる */}
    <Script
      id="google"
      type="text/javascript"
      src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places`}
      async
      strategy="beforeInteractive"
    />
    <NewSpot />
  </>
);

export default CreateSpotPage;
