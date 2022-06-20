import { connectDatabase, insertDocument, getAllDocuments } from "../../../helpers/db-util";

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
      const users = await getAllDocuments(client, "users", { _id: -1 });
      res.status(200).json({ users: users });
    } catch (error) {
      res.status(500).json({ message: "Getting users failed." });
    }

    client.close();
  }

  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
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
      await insertDocument(client, "users", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({
        message: "Inserting data failed!",
      });
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
