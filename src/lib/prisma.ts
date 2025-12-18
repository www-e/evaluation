import { PrismaClient } from '../generated/client/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { createPool } from 'mariadb';

// Ensure we use 'mariadb://' protocol
// Parse URL to get individual components
const urlString = (process.env.DATABASE_URL || "").replace("mysql://", "mariadb://");
const url = new URL(urlString);

console.log("Initializing MariaDB Pool...");
console.log("Host:", url.hostname);
console.log("Port:", url.port);
console.log("User:", url.username);
console.log("Database:", url.pathname.slice(1));

const pool = createPool({
  host: url.hostname,
  port: parseInt(url.port) || 3306,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
  connectionLimit: 5,
  // Critical Timeouts
  acquireTimeout: 30000, 
  connectTimeout: 30000,
  idleTimeout: 30000,
  // SSL Configuration for Railway
  ssl: {
      rejectUnauthorized: false
  },
  // Debug mode
  metaAsArray: false,
});

console.log("Pool created with limit: 5 and timeouts: 30s");

const adapter = new PrismaMariaDb(pool as any);

// Use a distinct key to avoid HMR cache conflicts during dev
const globalForPrisma = global as unknown as { prisma7: PrismaClient };

export const prisma =
  globalForPrisma.prisma7 ||
  new PrismaClient({
    adapter,
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma7 = prisma;
