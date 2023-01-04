import { getBookmarkById } from "@/helpers/bookmark-api-util";
import {
  connectDatabase,
  insertDocument,
  removeDocument,
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
      const bookmarks = await getAllDocuments(client, "bookmarks", { _id: -1 });
      res.status(200).json({ bookmarks: bookmarks });
    } catch (error) {
      res.status(500).json({ message: "Getting bookmarks failed." });
    }

    client.close();
  }

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

    let findBookmarkData;

    try {
      findBookmarkData = await getBookmarkById(userId, spotId);
    } catch {
      res.status(500).json({
        message: "Could not find Bookmark!",
      });
      return;
    }

    if (findBookmarkData.length !== 0) {
      try {
        await removeDocument(client, "bookmarks", {
          user_id: userId,
          spot_id: spotId,
        });
      } catch (error) {
        res.status(500).json({
          message: "Inserting data failed!",
        });
        return;
      }
    }

    const now = new Date();

    if (findBookmarkData.length === 0) {
      try {
        await insertDocument(client, "bookmarks", {
          user_id: userId,
          spot_id: spotId,
          created_at: now,
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
};

export default handler;
