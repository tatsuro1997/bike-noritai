export async function getAllSpots() {
  let spots;

  await fetch("http://localhost:3000/api/spots/")
    .then((response) => response.json())
    .then((data) => {
      spots = data.spots;
    });

  return spots;
}

export async function getFeaturedSpots() {
  const allSpots = await getAllSpots();
  console.log('@spotApi getFeaturedSpots', allSpots);
  return allSpots.filter((spot) => spot.isFeatured);
}

export async function getSpotById(id) {
  const allSpots = await getAllSpots();
  console.log("@spotApi getSpotById", allSpots);
  console.log("@spotApi getSpotById id", id);
  return allSpots.find((spot) => spot._id === id);
}

export async function getFilteredSpots(dateFilter) {
  const { year, month } = dateFilter;

  const allSpots = await getAllSpots();

  let filteredSpots = allSpots.filter((spot) => {
    const spotDate = new Date(spot.date);
    return spotDate.getFullYear() === year && spotDate.getMonth() === month - 1;
  });

  return filteredSpots;
}
