// import crypto from "crypto";
import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashedPW: ", hashedPassword);
  return hashedPassword;
};

export default hashPassword;
