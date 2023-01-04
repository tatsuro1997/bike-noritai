import Head from "next/head";
import SpotLogistics from "../../../components/spot-detail/spot-logistics";
import SpotSummary from "../../../components/spot-detail/spot-summary";
import Comments from "../../../components/input/comments";
import {
  getSpotById,
  getFeaturedSpots,
  getCommentsBySpotId,
} from "../../../helpers/spot-api-util";
import { getBookmarkCount } from "../../../helpers/bookmark-api-util";
import { getThreeRecordsBySpotId } from "../../../helpers/record-api-util";

const SpotDetailPage = ({
  selectedSpot: spot,
  countedSpot: bookmarkCount,
  selectedComments: comments,
  selectedRecords: records,
}) => {
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
        spot={spot}
        records={records}
        bookmarkCount={bookmarkCount}
      />
      <Comments spotId={spot._id} comments={comments} />
    </>
  );
};

export const getStaticProps = async (context) => {
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
};

export const getStaticPaths = async () => {
  const spots = await getFeaturedSpots();

  const paths = spots.map((spot) => ({ params: { spotId: spot.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export default SpotDetailPage;
