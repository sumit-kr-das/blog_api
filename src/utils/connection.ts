import { Pool } from "pg";
import config from 'config';


const pgPool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "blog",
    password: "sumit",
    port: 5432
});

export default pgPool;