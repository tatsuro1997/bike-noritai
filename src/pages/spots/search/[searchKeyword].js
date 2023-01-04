import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import SpotList from "@/components/spots/spot-list";
import ResultsTitle from "@/components/spots/results-title";
import ErrorAlert from "@/components/ui/error-alert";
import SpotsSearch from "@/components/spots/spots-search";

const FilteredSpotsPage = () => {
  const [loadedSpots, setLoadedSpots] = useState();
  const router = useRouter();
  const searchKeyword = router.query.searchKeyword || " ";

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/spots/`)
      .then((response) => response.json())
      .then((data) => {
        setLoadedSpots(data.spots);
      })
      .catch((error) => console.log(error));
  }, []);

  const pageHeadData = (
    <Head>
      <title>スポット検索</title>
      <meta name="description" content={`${searchKeyword}でスポットを検索`} />
    </Head>
  );

  if (!loadedSpots) {
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

  const filteredSpots = loadedSpots.filter((spot) => {
    const spotType = spot.type;
    const spotPrefecture = spot.prefecture;
    const spotAddress1 = spot.address1;
    const spotAddress2 = spot.address2;
    const spotDescription = spot.description;

    return (
      spotType.includes(searchKeyword) ||
      spotPrefecture.includes(searchKeyword) ||
      spotAddress1.includes(searchKeyword) ||
      spotAddress2.includes(searchKeyword) ||
      spotDescription.includes(searchKeyword)
    );
  });

  if (!filteredSpots || filteredSpots.length === 0) {
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
      <SpotList items={filteredSpots} />
    </>
  );
};

export default FilteredSpotsPage;
