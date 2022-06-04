import { connectDatabase } from "../../../helpers/db-util";
import { hashPassword } from "../../../helpers/auth-util";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const { email, password, uid } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        "Invalid input -password should also be at least 7 characters long.",
    });
    return;
  }

  const client = await connectDatabase();

  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);
  const now = new Date();

  const result = await db.collection("users").insertOne({
    email: email,
    password: hashedPassword,
    uid: uid,
    created_at: now,
  });

  res.status(201).json({
    message: "Create user!",
  });
}

export default handler;
