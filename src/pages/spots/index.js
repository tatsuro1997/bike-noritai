import Head from "next/head";
import SpotList from "../../components/spots/spot-list";
import SpotRegistration from "../../components/spots/spot-registration";
import SpotsSearch from "../../components/spots/spots-search";
import { getAllSpots } from "../../helpers/spot-api-util";

const AllSpotsPage = ({ spots }) => (
  <>
    <Head>
      <title>バイクノリタイ - スポット一覧</title>
      <meta
        name="description"
        content="Find a lot of great spots that allow you to evolve..."
      />
    </Head>
    <SpotRegistration />
    <SpotsSearch />
    <SpotList items={spots} />
  </>
);

export const getStaticProps = async() => {
  const spots = await getAllSpots();

  return {
    props: {
      spots: spots,
    },
    revalidate: 60,
  };
}

export default AllSpotsPage;
