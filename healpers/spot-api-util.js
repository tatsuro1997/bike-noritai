export async function getAllSpots() {
  const response = await fetch(
    "https://nextjs-course-dd497-default-rtdb.firebaseio.com/events.json"
    // 投稿データはmongoDBまたはスプシに置き換え要検討
  );
  const data = await response.json();

  const spots = [];

  for (const key in data) {
    spots.push({
      id: key,
      ...data[key],
    });
  }

  return spots;
}

export async function getFeaturedSpots() {
  const allSpots = await getAllSpots();
  return allSpots.filter((spot) => spot.isFeatured);
}

export async function getSpotById(id) {
  const allSpots = await getAllSpots();
  return allSpots.find((spot) => spot.id === id);
}

export async function getFilteredSpots(dateFilter) {
  const { year, month } = dateFilter;

  const allSpots = await getAllSpots();

  let filteredSpots = allSpots.filter((spot) => {
    const spotDate = new Date(spot.date);
    return (
      spotDate.getFullYear() === year && spotDate.getMonth() === month - 1
    );
  });

  return filteredSpots;
}
