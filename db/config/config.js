import 'dotenv/config';

export const DB_CONFIG = {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    db: process.env.PGDATABASE,
    dialect: process.env.PGDIALECT,
}