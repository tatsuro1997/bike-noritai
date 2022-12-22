import Head from "next/head";

import SpotLogistics from "../../../components/spot-detail/spot-logistics";
import SpotSummary from "../../../components/spot-detail/spot-summary";
import Comments from "../../../components/input/comments";
import { getSpotById, getFeaturedSpots, getCommentsBySpotId } from "../../../helpers/spot-api-util";
import { getBookmarkCount } from "../../../helpers/bookmark-api-util";
import { getThreeRecordsBySpotId } from "../../../helpers/record-api-util";

function SpotDetailPage(props) {
  const spot = props.selectedSpot;
  const spotCount = props.countedSpot;
  const comments = props.selectedComments;
  const records = props.selectedRecords;

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
        <meta name="description" content={spot.description} />
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
        description={spot.description}
        image={spot.image}
        imageAlt={spot.name}
        count={spotCount}
        lat={spot.lat}
        lng={spot.lng}
        records={records}
      />
      <Comments spotId={spot._id} comments={comments} />
    </>
  );
}

export async function getStaticProps(context) {
  const spotId = context.params.spotId;

  const spot = await getSpotById(spotId);

  const spotCount = await getBookmarkCount(spotId);

  const comments = await getCommentsBySpotId(spotId);

  const threeRecords = await getThreeRecordsBySpotId(spotId);

  return {
    props: {
      selectedSpot: spot,
      countedSpot: spotCount,
      selectedComments: comments,
      selectedRecords: threeRecords,
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
