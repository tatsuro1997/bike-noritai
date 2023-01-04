import { getSession } from "next-auth/react";
import { connectDatabase } from "../../../helpers/db-util";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "No authenticated!" });
    return;
  }

  const userEmail = session.user.email;

  const client = await connectDatabase();

  const userCollection = client.db().collection("users");

  const user = await userCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found." });
    client.close();
    return;
  }

  const userName = req.body.name;
  const userExperience = req.body.experience;
  const userUrl = req.body.url;
  const userArea = req.body.area;
  const usePrefecturer = req.body.prefecture;
  const userBikeName = req.body.bike_name;

  const result = await userCollection.updateOne(
    {
      _id: user._id,
    },
    {
      $set: {
        name: userName,
        experience: userExperience,
        url: userUrl,
        area: userArea,
        prefecture: usePrefecturer,
        bike_name: userBikeName,
      },
      $currentDate: {
        lastModified: true,
      },
    }
  );

  client.close();
  res.status(200).json({ message: "User Info updated!" });
};

export default handler;
