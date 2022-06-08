import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import SpotList from "../../../components/spots/spot-list";
import ResultsTitle from "../../../components/spots/results-title";
import Button from "../../../components/ui/button";
import ErrorAlert from "../../../components/ui/error-alert";

function FilteredSpotsPage() {
  const [loadedSpots, setLoadedSpots] = useState();
  const router = useRouter();

  const searchKeyword = router.query.searchKeyword || " ";

  useEffect(() => {
    fetch("http://localhost:3000/api/spots/")
      .then((response) => response.json())
      .then((data) => {
        setLoadedSpots(data.spots);
      });
  }, []);

  const pageHeadData = (
    <Head>
      <title>スポット検索</title>
      <meta name="description" constent={`${searchKeyword}でスポットを検索`} />
    </Head>
  );

  if (!loadedSpots) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>;
      </>
    );
  }

  if (!searchKeyword) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>検索をし直してください。</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/spots">全てのスポットを見る</Button>
        </div>
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
          <p>検索スポットが見つかりませんでした。</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/spots">全てのスポットを見る</Button>
        </div>
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
}

export default FilteredSpotsPage;
