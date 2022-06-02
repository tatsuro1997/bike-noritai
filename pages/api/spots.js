import { connectDatabase, insertDocument, getAllDocuments } from "../../healpers/db-util";

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
      const spots = await getAllDocuments(client, "spots", { _id: -1 });
      res.status(200).json({ spots: spots });
    } catch (error) {
      res.status(500).json({ message: "Getting spots failed." });
    }

    client.close();
  }

  if (req.method === "POST") {
    const spotName = req.body.name;
    const spotImage = req.body.image;
    const spotType = req.body.type;
    const spotPrefecture = req.body.prefecture;
    const spotAddress1 = req.body.address1;
    const spotAddress2 = req.body.address2;
    const spotHp = req.body.hp_url;
    const spotOpenTime = req.body.open_time;
    const spotOffDay = req.body.off_day;
    const spotParking = req.body.parking;
    const spotDescription = req.body.description;

    if (
      !spotName ||
      spotName.trim() === "" ||
      !spotType ||
      spotType.trim() === "" ||
      !spotPrefecture ||
      spotPrefecture.trim() === "" ||
      !spotAddress1 ||
      spotAddress1.trim() === "" ||
      !spotAddress2 ||
      spotAddress2.trim() === ""
    ) {
      res.status(422).json({ message: "スポット情報を見直してください" });
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
      await insertDocument(client, "spots", {
        name: spotName,
        image: spotImage,
        type: spotType,
        prefecture: spotPrefecture,
        address1: spotAddress1,
        address2: spotAddress2,
        hp_url: spotHp,
        open_time: spotOpenTime,
        off_day: spotOffDay,
        parking: spotParking,
        description: spotDescription,
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
