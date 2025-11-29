import prisma from "../src/config/prisma";

async function main() {
  try {
    const calls = await prisma.call.findMany({ include: { user: true } });
    console.log("Calls found:", calls.length);
    console.dir(calls, { depth: null });
  } catch (e) {
    console.error("Error querying calls:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
