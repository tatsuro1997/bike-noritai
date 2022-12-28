import { connectDatabase } from "../../../helpers/db-util";
import { getSpotById } from "../../../helpers/spot-api-util";

const handler = async(req, res) => {
  const spotId = req.query.spotId;

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
      const spot = await getSpotById(spotId);
      res.status(200).json({ spot: spot });
    } catch (error) {
      res.status(500).json({ message: "Getting spots failed." });
    }

    client.close();
  }
}

export default handler;
