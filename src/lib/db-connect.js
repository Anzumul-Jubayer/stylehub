import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri || !dbName) {
  throw new Error("Missing MongoDB env variables");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

export const collections = {
  users: "users",       // Admin / Customers
  products: "products", // Clothing items
  orders: "orders",     // Optional future orders
};

export const dbConnect = (name) => {
  if (!db) {
    db = client.db(dbName);
    console.log("✅ MongoDB connected");
  }

  if (!collections[name]) {
    throw new Error(`Collection ${name} not defined`);
  }

  return db.collection(collections[name]);
};
