import { connectDatabase, insertDocument, getAllDocuments } from "../../../helpers/db-util";

async function handler(req, res) {
  const spotId = req.query.spotId;

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

    const newComment = {
      uid,
      name,
      text,
      spotId,
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

  if (req.method === "GET") {

    try {
      const documents = await getAllDocuments(client, 'comments', {_id: -1})
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({message: 'Getting comments failed.'})
    }
  }

  client.close();
}

export default handler;
