export const getAllSpots = async () => {
  const url = `${process.env.NEXT_PUBLIC_FETCH_URL}/api/spots`;

  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const { spots } = await response.json();

      return spots;
    } else {
      throw new Error("スポットデータの取得に失敗しました。");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSpot  = async (id) => {
  const url = `${process.env.NEXT_PUBLIC_FETCH_URL}/api/spots/${id}`;

  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const { spot } = await response.json();

      return spot;
    } else {
      throw new Error("スポットデータの取得に失敗しました。");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getFeaturedSpots = async () => {
  const allSpots = await getAllSpots();
  return allSpots.filter((spot) => spot.isFeatured);
};

export const getSpotById = async (id) => {
  const spot = await getSpot(id);

  return spot;
};

export const getSpotByUid = async (Uid) => {
  const allSpots = await getAllSpots();
  return allSpots.filter((spot) => spot.user_id === Number(Uid));
};

export const getFilteredSpots = async (dateFilter) => {
  const { year, month } = dateFilter;

  const allSpots = await getAllSpots();

  let filteredSpots = allSpots.filter((spot) => {
    const spotDate = new Date(spot.date);
    return spotDate.getFullYear() === year && spotDate.getMonth() === month - 1;
  });

  return filteredSpots;
};
