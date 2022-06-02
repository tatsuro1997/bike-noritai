import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR from "swr";

import SpotList from "../../components/spots/spot-list";
import ResultsTitle from "../../components/spots/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredSpots } from "../../helpers/spot-api-util";

function FilteredSpotsPage(props) {
  const [loadedSpots, setLoadedSpots] = useState();
  const router = useRouter();

  const filterData = router.query.slug;

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "https://nextjs-course-dd497-default-rtdb.firebaseio.com/spots.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const spots = [];

      for (const key in data) {
        spots.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedSpots(spots);
    }
  }, [data]);

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  const pageHeadData = (
    <Head>
      <title>Filtered Spots</title>
      <meta
        name="description"
        constent={`All spots for ${numMonth}/${numYear}.`}
      />
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

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>Invaild filter. Please adjust your values.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/spots">Show All Spots</Button>
        </div>
      </>
    );
  }

  const filteredSpots = loadedSpots.filter((spot) => {
    const spotDate = new Date(spot.date);
    return (
      spotDate.getFullYear() === numYear &&
      spotDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredSpots || filteredSpots.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p>No spots found for chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/spots">Show All Spots</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <SpotList items={filteredSpots} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredSpotsPage;
