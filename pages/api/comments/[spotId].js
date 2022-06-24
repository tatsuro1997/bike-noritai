import { connectDatabase, insertDocument } from "../../../helpers/db-util";

async function handler(req, res) {
  const spot_id = req.query.spotId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database faild!" });
    return;
  }

  if (req.method === "POST") {
    const { uid, name, text } = req.body;

    if (
      !uid||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      client.close();
      return;
    }

    const now = new Date();

    const newComment = {
      uid,
      name,
      text,
      spot_id,
      created_at: now,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Added comment.", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Inserting comment faild!" });
    }
  }
}

export default handler;
