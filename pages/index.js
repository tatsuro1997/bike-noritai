import Head from "next/head";

import { getFeaturedSpots } from "../healpers/api-util";
import SpotList from "../components/spots/spot-list";
import NewsletterRegistration from "../components/input/newsletter-registration";

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
      <NewsletterRegistration />
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
