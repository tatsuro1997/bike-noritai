import Head from "next/head";

import { getAllSpots } from "../helpers/spot-api-util";
import SpotList from "../components/spots/spot-list";
import SpotRegistration from "../components/spots/spot-registration";
import TopMain from "../components/top/top-main";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>バイクノリタイ</title>
        <meta
          name="description"
          constent="バイカー向けスポット検索サイト「バイクノリタイ」は全国〇〇箇所のスポットを掲載中。条件検索からあなたにピッタリのスポットが見つかります！"
        />
      </Head>
      <TopMain />
      {/* <SpotRegistration /> */}
      <SpotList items={props.spots} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredSpots = await getAllSpots();

  return {
    props: {
      spots: featuredSpots,
    },
    revalidate: 1800,
  };
}

export default HomePage;
