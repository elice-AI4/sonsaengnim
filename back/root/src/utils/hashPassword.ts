import crypto from "crypto";

const hashPassword: Function = (password: string) => {
  const hashedPassword = crypto.createHash("sha512").update(password).digest("hex");
  return hashedPassword;
};

export { hashPassword };
