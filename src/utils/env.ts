import dotenv from "dotenv";

dotenv.config();

export const PORT: string = process.env.PORT || "3000";
export const prefix: string = "/api";
export const JWT_SECRET: string = process.env.JWT_SECRET || "inisecret";
export const DATABASE_URL: string = process.env.DATABASE_URL || "";
