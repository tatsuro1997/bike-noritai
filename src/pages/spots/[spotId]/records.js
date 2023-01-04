import RecordList from "../../../components/records/record-list"
import DetailHead from "../../../components/spot-detail/detail-head";
import SpotSummary from "../../../components/spot-detail/spot-summary";
import { getBookmarkCount } from "../../../helpers/bookmark-api-util";
import { getRecordsBySpotId } from "../../../helpers/record-api-util";
import { getSpotById, getFeaturedSpots } from "../../../helpers/spot-api-util";

const Records = ({ spot, bookmarkCount, records }) => (
  <>
    <SpotSummary name={spot.name} />
    <DetailHead spotId={spot.id} bookmarkCount={bookmarkCount} />
    <RecordList items={records} />
  </>
);

export const getStaticProps = async(context) => {
  const spotId = context.params.spotId;
  const spot = await getSpotById(spotId);
  const bookmarkCount = await getBookmarkCount(spotId);
  const records = await getRecordsBySpotId(spotId);

  console.log(bookmarkCount);

  return {
    props: {
      spot,
      bookmarkCount,
      records,
    },
    revalidate: 30,
  };
}

export const getStaticPaths = async() => {
  const spots = await getFeaturedSpots();
  const paths = spots.map((spot) => ({ params: { spotId: spot.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default Records
