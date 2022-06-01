import Head from "next/head";

import { getFeaturedSpots } from "../healpers/spot-api-util";
import SpotList from "../components/spots/spot-list";
import NewUserRegistration from "../components/input/new-user-registration";
import Link from "next/link";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJS Spots</title>
        <meta
          name="description"
          constent="Find a lot of great spots that allow you to evolve..."
        />
      </Head>
      <NewUserRegistration />
      <Link href="/spots/create">
        スポット登録
      </Link>
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
