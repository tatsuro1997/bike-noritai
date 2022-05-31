import Head from "next/head";

import SpotContent from "../../components/spot-detail/spot-content";
import SpotLogistics from "../../components/spot-detail/spot-logistics";
import SpotSummary from "../../components/spot-detail/spot-summary";
import Comments from "../../components/input/comments";
import ErrorAlert from "../../components/ui/error-alert";
import { getSpotById, getFeaturedSpots } from "../../healpers/spot-api-util";

function SpotDetailPage(props) {
  const spot = props.selectedSpot;

  if (!spot) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{spot.title}</title>
        <meta name="description" constent={spot.description} />
      </Head>
      <SpotSummary title={spot.title} />
      <SpotLogistics
        date={spot.date}
        address={spot.location}
        image={spot.image}
        imageAlt={spot.title}
      />
      <SpotContent>
        <p>{spot.description}</p>
      </SpotContent>
      <Comments spotId={spot.id} />
    </>
  );
}

export async function getStaticProps(context) {
  const spotId = context.params.spotId;

  const spot = await getSpotById(spotId);

  return {
    props: {
      selectedSpot: spot,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const spots = await getFeaturedSpots();

  const paths = spots.map((spot) => ({ params: { spotId: spot.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default SpotDetailPage;
