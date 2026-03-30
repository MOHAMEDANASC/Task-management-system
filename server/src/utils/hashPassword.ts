import bcrypt from "bcrypt";

async function generateHash() {
  const newPassword = "Admin1234"; 

  const hash = await bcrypt.hash(newPassword, 10);

  console.log("Hashed password:");
  console.log(hash);
}

generateHash();