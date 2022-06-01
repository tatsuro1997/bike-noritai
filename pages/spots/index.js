import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import SpotList from "../../components/spots/spot-list";
import SpotsSearch from "../../components/spots/spots-search";
import { getAllSpots } from "../../healpers/spot-api-util";

function AllSpotsPage(props) {
  const router = useRouter();
  const { spots } = props;

  function findSpotsHandler(year, month) {
    const fullPath = `/spots/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <Head>
        <title>バイクノリタイ - スポット一覧</title>
        <meta
          name="description"
          constent="Find a lot of great spots that allow you to evolve..."
        />
      </Head>
      <SpotsSearch onSearch={findSpotsHandler} />
      <Link href="/spots/create">スポット登録</Link>
      <SpotList items={spots} />
    </>
  );
}

export async function getStaticProps() {
  const spots = await getAllSpots();

  return {
    props: {
      spots: spots,
    },
    revalidate: 60,
  };
}

export default AllSpotsPage;
