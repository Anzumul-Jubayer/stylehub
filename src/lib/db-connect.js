import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri || !dbName) {
  console.warn("⚠️ MongoDB environment variables not found. Database operations will fail.");
}

let client;
let clientPromise;

// Initialize client only if environment variables are available and valid
if (uri && dbName && (uri.startsWith('mongodb://') || uri.startsWith('mongodb+srv://'))) {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    clientPromise = client.connect();
  }
}

export const collections = {
  users: "users",       // Admin / Customers
  products: "products", // Clothing items
  orders: "orders",     // Optional future orders
};

export const dbConnect = async (collectionName) => {
  if (!uri || !dbName || (!uri.startsWith('mongodb://') && !uri.startsWith('mongodb+srv://'))) {
    throw new Error("MongoDB environment variables not configured or invalid");
  }

  if (!clientPromise) {
    throw new Error("MongoDB client not initialized");
  }

  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    
    // Use the collection name directly or map from predefined collections
    const actualCollectionName = collections[collectionName] || collectionName;
    
    return db.collection(actualCollectionName);
  } catch (error) {
    console.error("Database connection error:", error);
    throw new Error("Failed to connect to database");
  }
};
