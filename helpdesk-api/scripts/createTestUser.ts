import prisma from "../src/config/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../src/utils/generateToken";

async function main() {
  try {
    const password = await bcrypt.hash("password123", 10);
    const user = await prisma.user.create({
      data: {
        name: "Test User",
        email: "test@example.com",
        password,
        role: "CLIENT",
      },
    });
    console.log("Created user:", user);
    const token = generateToken(user.id, user.role);
    console.log(
      "JWT token (use this in frontend Authorization header):",
      token
    );
  } catch (e) {
    console.error("Error creating user:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
