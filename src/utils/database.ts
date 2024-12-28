import mongoose, { MongooseError } from "mongoose";
import { DATABASE_URL } from "./env";

class Database {
  async connect() {
    try {
      await mongoose.connect(DATABASE_URL, {
        dbName: "nodejs-bootcamp",
      });
      return "Database connected";
    } catch (error) {
      const err = error as MongooseError;
      console.log(err.message);
      throw new Error(err.message);
    }
  }
}

export default new Database();
