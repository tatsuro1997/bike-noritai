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
  return allSpots.filter((spot) => spot.isFeatured);
}

export async function getSpotById(id) {
  const allSpots = await getAllSpots();
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

export async function getAllComments() {
  let comments;

  await fetch("http://localhost:3000/api/comments/")
    .then((response) => response.json())
    .then((data) => {
      comments = data.comments;
    });

  return comments;
}

export async function getCommentsBySpotId(spotId) {
  const allComments = await getAllComments();

  let filteredComments = allComments.filter((comment) => {
    return comment.spotId === spotId;
  })

  return filteredComments;
}
