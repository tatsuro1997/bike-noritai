export const getComments = async (spotId) => {
  const url = `${process.env.NEXT_PUBLIC_FETCH_URL}/api/spots/${spotId}/comments`;

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
  const comments = await getComments(spotId);

  return comments;
};
