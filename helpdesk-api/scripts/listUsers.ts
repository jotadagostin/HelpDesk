import prisma from "../src/config/prisma";

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log("Users found:", users.length);
    console.dir(users, { depth: null });
  } catch (e) {
    console.error("Error querying users:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
