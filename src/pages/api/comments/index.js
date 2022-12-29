import { connectDatabase, getAllDocuments } from "../../../helpers/db-util";

const handler = async(req, res) => {
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database faild!" });
    return;
  }

  if (req.method === "GET") {
    try {
      const comments = await getAllDocuments(client, "comments", { created_at: -1 });
      res.status(200).json({ comments: comments });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed." });
    }
  }

  client.close();
}

export default handler;
