import { connect as connectMongoose, connection } from "mongoose";
import { MongoError } from "mongodb";

const getMongoURI = (database: string) => {
  return process.env.MONGODB_URI + database;
};

const connect = async () => {
  const mongodbURI = getMongoURI("acm");

  try {
    await connectMongoose(mongodbURI);

    connection.on("connected", () => {
      console.log("Database successfully connected with MongoDB connection.");
    });
  } catch (error) {
    if (error instanceof MongoError) {
      throw new Error("Unable to connect to database", error);
    }
  }
};
