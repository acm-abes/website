// import { connect as connectMongoose, Connection, connection } from "mongoose";
// import { MongoError } from "mongodb";
//
// const getMongoURI = () => {
//   return process.env.MONGODB_URI;
// };

// export const connect = async () => {
//   const mongodbURI = getMongoURI();
//
//   try {
//     await connectMongoose(mongodbURI);
//
//     let con = connection.on("connected", () => {
//       console.log("Database successfully connected with MongoDB");
//     });
//   } catch (error) {
//     if (error instanceof MongoError) {
//       throw new Error("Unable to connect to database", error);
//     }
//   }
// };

import { connect as connectMongoose, Connection } from "mongoose";

declare global {
  var mongoose: {
    promise: Promise<typeof import("mongoose")> | null;
    conn: typeof import("mongoose") | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = connectMongoose(MONGODB_URI);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
