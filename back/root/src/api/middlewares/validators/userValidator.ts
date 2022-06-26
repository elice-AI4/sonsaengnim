import { body } from "express-validator";
import { validate } from "./result";

export const userValidateOptional = [
  body("email").optional().trim().isEmail().withMessage("이메일 형식으로 입력하세요."),
  body("username").optional().trim().notEmpty().withMessage("공백은 안됩니다."),
  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("공백은 안됩니다.")
    .isLength({ min: 8 })
    .withMessage("8글자 이상 써주세요."),
  validate,
];

export const userValidate = [
  body("email")
    .exists()
    .withMessage("email 항목이 없습니다.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("공백은 안됩니다. username을 입력해주세요.")
    .bail()
    .isEmail()
    .withMessage("이메일 형식으로 입력하세요."),
  body("username")
    .exists()
    .withMessage("username 항목이 없습니다.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("공백은 안됩니다. username을 입력해주세요."),
  body("password")
    .exists()
    .withMessage("password 항목이 없습니다.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("공백은 안됩니다. password를 입력해주세요.")
    .isLength({ min: 8 })
    .withMessage("8글자 이상 써주세요."),
  validate,
];
