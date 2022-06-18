export async function getAllRecords() {
  let records;

  await fetch("http://localhost:3000/api/records/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      records = data.records;
    });

  return records;
}

export async function getRecordById(id) {
  const allSpots = await getAllRecords();
  return allSpots.find((record) => record._id === id);
}
