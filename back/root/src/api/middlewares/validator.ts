import { body, validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json(errors);
};

export const userValidate = [
  body("email").trim().isEmail().withMessage("이메일 형식으로 입력하세요."),
  body("username").trim().isLength({ min: 1 }).withMessage("공백은 안됩니다."),
  body("password").trim().isLength({ min: 1 }).withMessage("공백은 안됩니다."),
  validate,
];
