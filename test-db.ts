
import { createPool } from 'mariadb';
import 'dotenv/config';

async function testConnection() {
  const urlString = (process.env.DATABASE_URL || "").replace("mysql://", "mariadb://");
  
  console.log("Testing MariaDB Connection...");
  console.log("URL:", urlString);

  // Parse for explicit config
  const url = new URL(urlString);
  
  const pool = createPool({
    host: url.hostname,
    port: parseInt(url.port) || 3306,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1),
    connectionLimit: 5,
    acquireTimeout: 10000,
    connectTimeout: 10000,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log("Attempting pool.getConnection()...");
    const conn = await pool.getConnection();
    console.log("✅ SUCCESS! Connected to database.");
    
    const rows = await conn.query("SELECT 1 as val");
    console.log("Query Result:", rows);
    
    conn.release(); // release to pool
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error("❌ FAILED to connect:", err);
    process.exit(1);
  }
}

testConnection();
