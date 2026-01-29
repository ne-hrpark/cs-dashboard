import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config: sql.config = {
  server: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT || '1433', 10),
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: true,
    enableArithAbort: true,
  },
};

let connectionPool: sql.ConnectionPool | null = null;

export const getPool = async (): Promise<sql.ConnectionPool> => {
  if (!connectionPool) {
    connectionPool = await sql.connect(config);
  }
  return connectionPool;
};

export async function initDatabase(): Promise<void> {
  connectionPool = await getPool();
}

export async function closeDatabase(): Promise<void> {
  if (connectionPool) {
    await connectionPool.close();
    connectionPool = null;
  }
}
