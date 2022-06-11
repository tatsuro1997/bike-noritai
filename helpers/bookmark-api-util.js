export async function getAllBookmarks() {
  let bookmarks;

  await fetch("http://localhost:3000/api/bookmarks/")
    .then((response) => response.json())
    .then((data) => {
      bookmarks = data.bookmarks;
    })
    .catch((error) => {
      console.log(error);
    });

  return bookmarks;
}

export async function getBookmarkById(userId, spotId) {
  const allBookmarks = await getAllBookmarks();
  return allBookmarks.filter((bookmark) => {
    return bookmark.user_id === userId && bookmark.spot_id === spotId;
  });
}
