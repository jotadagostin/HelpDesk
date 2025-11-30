import prisma from "../src/config/prisma";

async function main() {
  try {
    // Criar uma call para o cliente (userId: 2)
    const call = await prisma.call.create({
      data: {
        title: "Chamada de teste do cliente",
        description: "Criada via script para teste",
        category: "internet",
        total: null,
        userId: 2, // Cliente teste (id 2)
        technicianName: null,
        status: "open",
      },
      include: { user: true },
    });

    console.log("✅ Call created for client (userId 2):");
    console.log(JSON.stringify(call, null, 2));

    // Agora listar todas as calls
    console.log("\n📋 All calls in database:");
    const allCalls = await prisma.call.findMany({ include: { user: true } });
    console.log(`Total: ${allCalls.length} calls`);
    allCalls.forEach((c) => {
      console.log(
        `  - ID ${c.id}: "${c.title}" (userId: ${c.userId}, user: ${c.user.email})`
      );
    });

    // Listar apenas calls do cliente (userId: 2)
    console.log("\n🔍 Calls for client (userId 2):");
    const clientCalls = await prisma.call.findMany({
      where: { userId: 2 },
      include: { user: true },
    });
    console.log(`Total: ${clientCalls.length} calls`);
    clientCalls.forEach((c) => {
      console.log(`  - ID ${c.id}: "${c.title}"`);
    });
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
