import prisma from "../src/config/prisma";

async function main() {
  try {
    const call = await prisma.call.create({
      data: {
        title: "Call from script",
        description: "Created directly by script",
        category: "backup",
        total: null,
        userId: 1,
        technicianName: null,
        status: "open",
      },
    });
    console.log("Call created:", call);
  } catch (e) {
    console.error("Error creating call:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
