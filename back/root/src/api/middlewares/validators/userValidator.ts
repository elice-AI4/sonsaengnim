import { body } from "express-validator";
import { validate } from "./result";

export const userValidateOptional = [
  body("email").optional().trim().isEmail().withMessage("이메일 형식으로 입력하세요."),
  body("username").optional().trim().notEmpty().withMessage("공백은 안됩니다."),
  body("password").optional().trim().notEmpty().withMessage("공백은 안됩니다."),
  validate,
];

export const userValidate = [
  body("email").exists().trim().isEmail().withMessage("이메일 형식으로 입력하세요."),
  body("username").exists().trim().notEmpty().withMessage("공백은 안됩니다."),
  body("password").exists().trim().notEmpty().withMessage("공백은 안됩니다."),
  validate,
];
