import { connect as connectMongoose, Connection, connection } from "mongoose";
import { MongoError } from "mongodb";

const getMongoURI = () => {
  return process.env.MONGODB_URI;
};

export const connect = async () => {
  const mongodbURI = getMongoURI();

  try {
    await connectMongoose(mongodbURI);

    let con = connection.on("connected", () => {
      console.log("Database successfully connected with MongoDB");
    });
  } catch (error) {
    if (error instanceof MongoError) {
      throw new Error("Unable to connect to database", error);
    }
  }
};
