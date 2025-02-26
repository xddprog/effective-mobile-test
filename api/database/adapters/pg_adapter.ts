import { DataSource } from 'typeorm';
import { Appeal } from '../models/appeal.js';
import { DATABASE_CONFIG } from '../../config/loadEnvs.js';


export const db = new DataSource({
    type: "postgres",
    host: DATABASE_CONFIG.DB_HOST,
    port: DATABASE_CONFIG.DB_PORT,
    username: DATABASE_CONFIG.DB_USERNAME,
    password: DATABASE_CONFIG.DB_PASSWORD,
    database: DATABASE_CONFIG.DB_DATABASE,
    entities: [Appeal],
    synchronize: true,
    logging: true, 
    migrations: [Appeal],
});

db.initialize()