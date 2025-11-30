import prisma from "../src/config/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../src/utils/generateToken";

async function main() {
  try {
    // Delete existing test user if exists
    await prisma.user.deleteMany({ where: { email: "cliente@teste.com" } });

    const password = "senha123";
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: "Cliente Teste",
        email: "cliente@teste.com",
        password: hashedPassword,
        role: "CLIENT",
      },
    });

    const token = generateToken(user.id, user.role);

    console.log("\n✅ User created successfully!");
    console.log(`📧 Email: cliente@teste.com`);
    console.log(`🔐 Password: senha123`);
    console.log(`👤 Role: CLIENT`);
    console.log(`\n🔑 JWT Token (expires in 1h):`);
    console.log(token);
    console.log(
      "\n💡 Tip: Use these credentials to login in the frontend at http://localhost:5173"
    );
  } catch (e) {
    console.error("❌ Error creating user:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
