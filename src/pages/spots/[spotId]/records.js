import RecordList from "../../../components/records/record-list"
import DetailHead from "../../../components/spot-detail/detail-head";
import SpotSummary from "../../../components/spot-detail/spot-summary";
import { getBookmarkCount } from "../../../helpers/bookmark-api-util";
import { getRecordsBySpotId } from "../../../helpers/record-api-util";
import { getSpotById, getFeaturedSpots } from "../../../helpers/spot-api-util";

function Records({ spot, count, records }) {
  return (
    <>
      <SpotSummary name={spot.name} />
      <DetailHead spotId={spot.id} count={count} />
      <RecordList items={records} />
    </>
  );
}

export async function getStaticProps(context) {
  const spotId = context.params.spotId;
  const spot = await getSpotById(spotId);
  const count = await getBookmarkCount(spotId);
  const records = await getRecordsBySpotId(spotId);

  return {
    props: {
      spot,
      count,
      records,
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

export default Records
