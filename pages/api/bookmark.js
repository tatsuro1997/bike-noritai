import { connectDatabase, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const userId = req.body.userId;
    const spotId = req.body.spotId;

    if (!userId) {
      res.status(422).json({ message: "Invalid user." });
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
      await insertDocument(client, "bookmarks", {
        user_id: userId,
        spot_id: spotId,
      });
      client.close();
    } catch (error) {

      res.status(500).json({
        message: "Inserting data failed!",
      });
      return;
    }

    res.status(201).json({ message: "イキタイに登録しました!" });
  }
}

export default handler;
