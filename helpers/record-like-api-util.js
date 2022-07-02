export async function getAllRecordLikes() {
  let recordLikes;

  await fetch("http://localhost:3000/api/record-likes/")
    .then((response) => response.json())
    .then((data) => {
      recordLikes = data.recordLikes;
    })
    .catch((error) => {
      console.log(error);
    });

  return recordLikes;
}

export async function getRecordLikeById(userId, recordId) {
  const allRecordLikes = await getAllRecordLikes();
  return allRecordLikes.filter((like) => {
    return like.user_id === userId && like.record_id === recordId;
  });
}

export async function getRecordLikeCount(recordId) {
  const allRecordLikes = await getAllRecordLikes();
  return allRecordLikes.filter((like) => {
    return like.record_id === recordId;
  }).length;
}
