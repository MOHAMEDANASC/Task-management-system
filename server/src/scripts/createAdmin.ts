import prisma from "../utils/prisma";
import bcrypt from "bcrypt";

async function main() {
  const password = await bcrypt.hash("Admin1234", 10);

  await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      password ,
      role: "admin",
    },
  });

  console.log("Admin created");
}

main();