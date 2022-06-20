import { getAllDocuments, connectDatabase } from "../../../helpers/db-util";

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
}

export default handler;
