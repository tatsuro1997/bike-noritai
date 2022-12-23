export const getAllRecords = async() => {
  const url = `${process.env.NEXT_PUBLIC_FETCH_URL}/api/records/`;

  try {
    const response = await fetch(url);
    const { records } = await response.json();

    return records;
  } catch (error) {
    console.log(error);
    return;
  }
}

export const getRecordsByUid = async(uid) => {
  const allRecords = await getAllRecords();
  return allRecords.filter((record) => record.uid === Number(uid));
}

export const getRecordsBySpotId = async(spotId) => {
  const allRecords = await getAllRecords();
  return allRecords.filter((record) => record.spot_id === spotId);
}

export const getRecordsByMonth = async(uid, month) => {
  const filteredRecords = await getRecordsByUid(uid);
  return filteredRecords.filter(
    (record) => new Date(record.date).getMonth() + 1 === month
  );
}

export const getThreeRecordsBySpotId = async(spotId) => {
  const allRecords = await getAllRecords();
  return allRecords.filter((record) => record.spot_id === spotId).slice(0, 3);
}
