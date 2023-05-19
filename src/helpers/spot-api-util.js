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

export const getFeaturedSpots = async () => {
  const allSpots = await getAllSpots();
  return allSpots.filter((spot) => spot.isFeatured);
};

export const getSpotById = async (id) => {
  const allSpots = await getAllSpots();
  return allSpots.find((spot) => spot._id === id);
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

export const getAllComments = async () => {
  const url = `${process.env.NEXT_PUBLIC_FETCH_URL}/api/comments/`;

  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const { comments } = await response.json();

      return comments;
    } else {
      throw new Error("コメントデータの取得に失敗しました。");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsBySpotId = async (spotId) => {
  const allComments = await getAllComments();

  let filteredComments = allComments.filter((comment) => {
    return comment.spot_id === spotId;
  });

  return filteredComments;
};
