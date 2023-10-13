import mongoose, { MongooseError } from "mongoose";
import logger from '../logger/logger'

function MongoConnection() {
  mongoose
    .connect(process.env.MONGO_DB_URL!)
    .then((success) => {
      logger.info(`[Mongo DB]: ${success.connection.host}`);
    })
    .catch((error: typeof MongooseError) => {
      logger.error(`[Mongo DB]: ${error.messages}`);
    });
}

export default MongoConnection;
