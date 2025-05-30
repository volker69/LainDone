import knex from "knex";
import {CONFIG} from './config'



const postgres_db = knex({
  client: 'pg',
  connection: CONFIG.DB_CONFIG
});

export default postgres_db;