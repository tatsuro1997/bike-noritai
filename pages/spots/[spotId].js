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
        <title>{spot.name}</title>
        <meta name="description" constent={spot.description} />
      </Head>
      <SpotSummary name={spot.name} />
      <SpotLogistics
        key={spot._id}
        id={spot._id}
        name={spot.name}
        type={spot.type}
        prefecture={spot.prefecture}
        address1={spot.address1}
        address2={spot.address2}
        open_time={spot.open_time}
        off_day={spot.off_day}
        parking={spot.parking}
        hp_url={spot.hp_url}
        image={spot.image}
        imageAlt={spot.name}
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
