import dotenv from "dotenv";

dotenv.config();

interface IDatabaseConfig {
    DB_HOST: string;
    DB_PORT: number;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
}


export class DatabaseConfig implements IDatabaseConfig {
    DB_PORT = Number(process.env.PORT);
    DB_HOST = String(process.env.DB_HOST);
    DB_USERNAME = String(process.env.DB_USERNAME);
    DB_PASSWORD = String(process.env.DB_PASSWORD);
    DB_DATABASE = String(process.env.DB_DATABASE);
}


export const DATABASE_CONFIG = new DatabaseConfig();