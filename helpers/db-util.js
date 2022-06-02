import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    // TODO: DB名をbike-noritaiに修正する
    "mongodb://tatz:n1fl3cI3Ifhp8jSo@cluster0-shard-00-00.smxrn.mongodb.net:27017,cluster0-shard-00-01.smxrn.mongodb.net:27017,cluster0-shard-00-02.smxrn.mongodb.net:27017/spots?ssl=true&replicaSet=atlas-8gitpc-shard-0&authSource=admin&retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
