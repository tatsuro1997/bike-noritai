import { connectDatabase } from "../../../helpers/db-util";
import { getUserById } from "../../../helpers/user-api-util";

const handler = async(req, res) => {
  const uid = req.query.uid;

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
      const user = await getUserById(uid);
      res.status(200).json({ user: user });
    } catch (error) {
      res.status(500).json({ message: "Getting user failed." });
    }

    client.close();
  }
}

export default handler;
