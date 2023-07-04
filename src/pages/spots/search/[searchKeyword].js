import Head from "next/head";
import SpotList from "@/components/spots/spot-list";
import ResultsTitle from "@/components/spots/results-title";
import ErrorAlert from "@/components/ui/error-alert";
import SpotsSearch from "@/components/spots/spots-search";
import { getSearchedSpots } from "@/helpers/spot-api-util";
import { prefectures } from "@/helpers/prefecture";

const FilteredSpotsPage = ({ searchedSpots, searchKeyword }) => {
  const pageHeadData = (
    <Head>
      <title>スポット検索</title>
      <meta name="description" content={`${searchKeyword}でスポットを検索`} />
    </Head>
  );

  if (!searchedSpots) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );
  }

  if (!searchKeyword) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>もう一度、検索をしてください...</p>
        </ErrorAlert>
        <SpotsSearch />
      </>
    );
  }

  if (!searchedSpots || searchedSpots.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>この検索条件ではスポットが見つかりませんでした...</p>
        </ErrorAlert>
        <SpotsSearch />
      </>
    );
  }

  return (
    <>
      {pageHeadData}
      <ResultsTitle searchKeyword={searchKeyword} />
      <SpotList items={searchedSpots} />
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const searchKeyword = params.searchKeyword;
  const spot = await getSearchedSpots(searchKeyword);

  return {
    props: {
      searchedSpots: spot,
      searchKeyword,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {

  const paths = prefectures.map((prefecture) => ({
    params: { searchKeyword: prefecture },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default FilteredSpotsPage;
