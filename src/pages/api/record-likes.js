import { getRecordLikeById } from "../../helpers/record-like-api-util";
import {
  connectDatabase,
  insertDocument,
  removeDocument,
  getAllDocuments,
} from "../../helpers/db-util";

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
      const recordLikes = await getAllDocuments(client, "record_likes", {
        _id: -1,
      });
      res.status(200).json({ recordLikes: recordLikes });
    } catch (error) {
      res.status(500).json({ message: "Getting recordLikes failed." });
    }

    client.close();
  }

  if (req.method === "POST") {
    const userId = req.body.userId;
    const recordId = req.body.recordId;

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

    let findRecordLikeData;

    try {
      findRecordLikeData = await getRecordLikeById(userId, recordId);
    } catch {
      res.status(500).json({
        message: "Could not find RecordLike!",
      });
      return;
    }

    if (findRecordLikeData.length !== 0) {
      try {
        await removeDocument(client, "record_likes", {
          user_id: userId,
          record_id: recordId,
        });
      } catch (error) {
        res.status(500).json({
          message: "Inserting data failed!",
        });
        return;
      }
    }

    const now = new Date();

    if (findRecordLikeData.length === 0) {
      try {
        await insertDocument(client, "record_likes", {
          user_id: userId,
          record_id: recordId,
          created_at: now,
        });
        client.close();
      } catch (error) {
        res.status(500).json({
          message: "Inserting data failed!",
        });
        return;
      }

      res.status(201).json({ message: "記録にイイネしました!" });
    }
  }
};

export default handler;
