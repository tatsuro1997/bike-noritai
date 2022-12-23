export const getAllBookmarks = async() => {
  const url = `${process.env.NEXT_PUBLIC_FETCH_URL}/api/bookmarks/`;

  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const { bookmarks } = await response.json();

      return bookmarks;
    } else {
      throw new Error("ブックマークデータの取得に失敗しました。");
    }
  } catch(error) {
    console.log(error);
  }
}

export const getBookmarkById = async(userId, spotId) => {
  const allBookmarks = await getAllBookmarks();
  return allBookmarks.filter((bookmark) => {
    return bookmark.user_id === userId && bookmark.spot_id === spotId;
  });
}

export const getBookmarkByUserId = async(userId) => {
  const allBookmarks = await getAllBookmarks();
  return allBookmarks.filter((bookmark) => {
    return bookmark.user_id === userId;
  });
}

export const getBookmarkCount = async(spotId) => {
  const allBookmarks = await getAllBookmarks();
  return allBookmarks.filter((bookmark) => {
    return bookmark.spot_id === spotId;
  }).length;
}
