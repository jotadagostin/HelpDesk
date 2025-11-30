import prisma from "../src/config/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../src/utils/generateToken";

async function main() {
  try {
    // Delete existing test admin if exists
    await prisma.user.deleteMany({ where: { email: "admin@teste.com" } });

    const password = "admin123";
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: "Admin Teste",
        email: "admin@teste.com",
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    const token = generateToken(user.id, user.role);

    console.log("\n✅ Admin user created successfully!");
    console.log(`📧 Email: admin@teste.com`);
    console.log(`🔐 Password: admin123`);
    console.log(`👤 Role: ADMIN`);
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
