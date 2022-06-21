export async function getAllRecords() {
  let records;

  await fetch("http://localhost:3000/api/records/")
    .then((response) => response.json())
    .then((data) => {
      records = data.records;
    });

  return records;
}

export async function getRecordsByUid(uid) {
  const allRecords = await getAllRecords();
  return allRecords.filter((record) => record.uid === Number(uid));
}

export async function getRecordsBySpotId(spotId) {
  const allRecords = await getAllRecords();
  return allRecords.filter((record) => record.spot_id === spotId);
}

export async function getRecordsThisMonth(uid, month) {
  const filteredRecords = await getRecordsByUid(uid);
  return filteredRecords.filter(
    (record) => new Date(record.created_at).getMonth() + 1 === month
  );
}
