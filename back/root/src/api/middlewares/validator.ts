import { body, validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json(errors);
};

export const userValidateOptional = [
  body("email").optional().trim().isEmail().withMessage("이메일 형식으로 입력하세요."),
  body("username").optional().trim().isLength({ min: 1 }).withMessage("공백은 안됩니다."),
  body("password").optional().trim().isLength({ min: 1 }).withMessage("공백은 안됩니다."),
  validate,
];

export const userValidate = [
  body("email").exists().trim().isEmail().withMessage("이메일 형식으로 입력하세요."),
  body("username").exists().trim().isLength({ min: 1 }).withMessage("공백은 안됩니다."),
  body("password").exists().trim().isLength({ min: 1 }).withMessage("공백은 안됩니다."),
  validate,
];
