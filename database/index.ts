import { connect } from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  if (!process.env.MONGODB_URI) {
    console.log("MONGODB_URI is missing");
    process.exit(1);
  }

  try {
    const db = await connect(process.env.MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to database", (error as Error).stack);
    // process.exit(1);
  }
}
