import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "@/helpers/db-util";

const handler = async (req, res) => {
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
      const spots = await getAllDocuments(client, "spots", { created_at: -1 });
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
    const spotAddress = req.body.address;
    const spotHp = req.body.hp_url;
    const spotOpenTime = req.body.open_time;
    const spotOffDay = req.body.off_day;
    const spotParking = req.body.parking;
    const spotDescription = req.body.description;
    const spotLat = req.body.lat;
    const spotLng = req.body.lng;
    const userId = req.body.userId;

    if (
      !spotName ||
      spotName.trim() === "" ||
      !spotType ||
      spotType.trim() === "" ||
      !spotAddress ||
      spotAddress.trim() === ""
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

    const now = new Date();

    try {
      await insertDocument(client, "spots", {
        name: spotName,
        image: spotImage,
        type: spotType,
        address: spotAddress,
        hp_url: spotHp,
        open_time: spotOpenTime,
        off_day: spotOffDay,
        parking: spotParking,
        description: spotDescription,
        lat: spotLat,
        lng: spotLng,
        created_at: now,
        user_id: userId,
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
};

export default handler;
