export const getAllSpots = async() => {
  let spots;
  const url = `${process.env.NEXT_PUBLIC_FETCH_URL}/api/spots/`;

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      spots = data.spots;
    });

  return spots;
}

export const getFeaturedSpots = async() => {
  const allSpots = await getAllSpots();
  return allSpots.filter((spot) => spot.isFeatured);
}

export const getSpotById = async(id) => {
  const allSpots = await getAllSpots();
  return allSpots.find((spot) => spot._id === id);
}

export const getSpotByUid = async(Uid) => {
  const allSpots = await getAllSpots();
  return allSpots.filter((spot) => spot.user_id === Number(Uid));
}

export const getFilteredSpots = async(dateFilter) => {
  const { year, month } = dateFilter;

  const allSpots = await getAllSpots();

  let filteredSpots = allSpots.filter((spot) => {
    const spotDate = new Date(spot.date);
    return spotDate.getFullYear() === year && spotDate.getMonth() === month - 1;
  });

  return filteredSpots;
}

export const getAllComments = async() => {
  let comments;

  await fetch("http://localhost:3000/api/comments/")
    .then((response) => response.json())
    .then((data) => {
      comments = data.comments;
    });

  return comments;
}

export const getCommentsBySpotId = async(spotId) => {
  const allComments = await getAllComments();

  let filteredComments = allComments.filter((comment) => {
    return comment.spot_id === spotId;
  })

  return filteredComments;
}
