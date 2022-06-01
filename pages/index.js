import Head from "next/head";

import { getFeaturedSpots } from "../healpers/spot-api-util";
import SpotList from "../components/spots/spot-list";
import NewUserRegistration from "../components/input/new-user-registration";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>バイクノリタイ - ツーリングスポット検索サイト</title>
        <meta
          name="description"
          constent="Find a lot of great spots that allow you to evolve..."
        />
      </Head>
      <NewUserRegistration />
      <SpotList items={props.spots} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredSpots = await getFeaturedSpots();

  return {
    props: {
      spots: featuredSpots,
    },
    revalidate: 1800,
  };
}

export default HomePage;
