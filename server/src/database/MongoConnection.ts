import mongoose, { MongooseError } from "mongoose";

function MongoConnection() {
  mongoose
    .connect(process.env.MONGO_DB_URL!)
    .then((success) => {
      console.log(`[Mongo DB]: ${success.connection.host}`);
    })
    .catch((error: typeof MongooseError) => {
      console.log(`[Mongo DB]: ${error.messages}`);
    });
}

export default MongoConnection;
