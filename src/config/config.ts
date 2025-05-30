import dotenv from 'dotenv';
import path from 'path';


const envPath = path.resolve(__dirname, '../../.env');
console.log('Ruta del .env:', envPath);
dotenv.config({ path: envPath });

export const CONFIG = {
    DB_CONFIG:{
        host: process.env.PG_HOST || 'database_todo',
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,    
        database: process.env.PG_DATABASE,
        port:  process.env.PG_PORT ? parseInt(process.env.PG_PORT) : 5432
    }
}

console.log('Configuración de BD:', CONFIG.DB_CONFIG);