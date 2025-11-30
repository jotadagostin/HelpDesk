import prisma from "../src/config/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../src/utils/generateToken";

async function main() {
  try {
    const password = await bcrypt.hash("tecpassword123", 10);
    const user = await prisma.user.create({
      data: {
        name: "Test Technician",
        email: "tec@example.com",
        password,
        role: "TEC",
      },
    });
    console.log("Created TEC user:", {
      id: user.id,
      email: user.email,
      role: user.role,
    });
    const token = generateToken(user.id, user.role);
    console.log(
      "JWT token (use this in frontend Authorization header):",
      token
    );
    console.log("Credentials: email=tec@example.com password=tecpassword123");
  } catch (e) {
    console.error("Error creating TEC user:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
