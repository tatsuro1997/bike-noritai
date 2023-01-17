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
    <NewSpot />
  </>
);

export default CreateSpotPage;
