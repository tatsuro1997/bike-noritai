import Head from "next/head";
import { getAllSpots } from "@/helpers/spot-api-util";
import { getAllRecords } from "@/helpers/record-api-util";
import TopMain from "@/components/top/top-main";
import LatestRecords from "@/components/records/latest-records";
import LatestSpots from "@/components/spots/latest-spots";
import PrefectureContent from "@/components/prefectures/prefecture-content";

const HomePage = ({ records, spots }) => (
  <>
    <Head>
      <title>バイクノリタイ</title>
      <meta
        name="description"
        content="バイカー向けスポット検索サイト「バイクノリタイ」は全国〇〇箇所のスポットを掲載中。条件検索からあなたにピッタリのスポットが見つかります！"
      />
    </Head>
    {/* <TopMain /> */}
    {/* <LatestRecords records={records} />
    <LatestSpots spots={spots} /> */}
    {/* <PrefectureContent /> */}
  </>
);

export const getStaticProps = async () => {
  const records = await getAllRecords();
  const spots = await getAllSpots();

  return {
    props: {
      records: records,
      spots: spots,
    },
    revalidate: 1800,
  };
};

export default HomePage;
