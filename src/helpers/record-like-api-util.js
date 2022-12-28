export const getAllRecordLikes = async () => {
  const url = `${process.env.NEXT_PUBLIC_FETCH_URL}/api/record-likes/`;

  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const { recordLikes } = await response.json();

      return recordLikes;
    } else {
      throw new Error("お気に入りデータの取得に失敗しました。");
    }
  } catch (error) {
    console.log(error);
  }
}

export const getRecordLikeById = async(userId, recordId) => {
  const allRecordLikes = await getAllRecordLikes();
  return allRecordLikes.filter((like) => {
    return like.user_id === userId && like.record_id === recordId;
  });
}

export const getRecordLikeCount = async(recordId) => {
  const allRecordLikes = await getAllRecordLikes();
  return allRecordLikes.filter((like) => {
    return like.record_id === recordId;
  }).length;
}
