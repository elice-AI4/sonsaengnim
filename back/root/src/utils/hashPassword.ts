// import crypto from "crypto";
import bcrypt from "bcrypt";

const hashPassword: Function = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  return hashedPassword;
};

export default hashPassword;
