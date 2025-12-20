import { prisma } from "@/lib/prisma";

async function truncateAllTables() {
  try {
    // Disable foreign key checks for MySQL to avoid constraint violations
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 0;`;

    // Truncate each table in the correct order (from dependent to independent)
    await prisma.orderItem.deleteMany({});
    console.log("Truncated OrderItem table");

    await prisma.order.deleteMany({});
    console.log("Truncated Order table");

    await prisma.product.deleteMany({});
    console.log("Truncated Product table");

    await prisma.category.deleteMany({});
    console.log("Truncated Category table");

    await prisma.user.deleteMany({});
    console.log("Truncated User table");

    // Re-enable foreign key checks
    await prisma.$executeRaw`SET FOREIGN_KEY_CHECKS = 1;`;

    console.log("All tables truncated successfully!");
  } catch (error) {
    console.error("Error truncating tables:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function
truncateAllTables();