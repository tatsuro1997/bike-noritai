import { getAllDocuments, connectDatabase, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "GET") {
    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({
        message: "Connecting to the database failed!",
      });
      return;
    }

    try {
      const records = await getAllDocuments(client, "records", { _id: -1 });
      res.status(200).json({ records: records });
    } catch (error) {
      res.status(500).json({ message: "Getting records failed." });
    }

    client.close();
  }

  if (req.method === "POST") {
    const recordDate = req.body.date;
    const recordWeather = req.body.weather;
    const recordTemperature = req.body.temperature;
    const recordRunningTime = req.body.running_time;
    const recordDistance = req.body.distance;
    const recordDescription = req.body.description;

    if (
      !recordDate ||
      !recordWeather ||
      !recordTemperature ||
      recordTemperature.trim() === "" ||
      !recordRunningTime ||
      recordRunningTime.trim() === "" ||
      !recordDistance ||
      recordDistance.trim() === "" ||
      !recordDescription ||
      recordDescription.trim() === ""
    ) {
      res.status(422).json({ message: "記録情報を見直してください" });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({
        message: "Connecting to the database failed!",
      });
      return;
    }

    try {
      await insertDocument(client, "records", {
        date: recordDate,
        weather: recordWeather,
        temperature: recordTemperature,
        running_time: recordRunningTime,
        distance: recordDistance,
        description: recordDescription,
      });
      client.close();
    } catch (error) {
      res.status(500).json({
        message: "Inserting data failed!",
      });
      return;
    }

    res.status(201).json({ message: "スポット投稿完了!" });
  }
}

export default handler;
