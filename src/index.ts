import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { app } from "./app";
import logger from "./utils/logger";
import { DB_NAME } from "./config/constants";

const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", true);

const connectDB = async (): Promise<void> => {
  try {
    const dbConnectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    logger.info(
      `Connected to MongoDB at ${dbConnectionInstance.connection.host}`
    );
  } catch (error) {
    logger.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
});
