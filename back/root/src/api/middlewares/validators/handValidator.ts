import { param, body } from "express-validator";
import { validate } from "./result";

export const handValidate = [
  body("alphabet")
    .exists()
    .withMessage("알파벳 항목이 없습니다.")
    .bail()
    .trim()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("공백입니다. 입력된 알파벳이 없습니다.")
    .bail()
    .isString()
    .withMessage("string 으로 입력해주세요."),
  body("handVideo")
    .exists()
    .withMessage("handVideo 항목이 없습니다.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("공백입니다. 입력된 handVideo가 없습니다."),
  // .isURL()
  body("mouthVideo")
    .exists()
    .withMessage("mouthVideo 항목이 없습니다.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("공백입니다. 입력된 mouthVideo가 없습니다.")
    .bail(),
  // .isURL()
  validate,
];

export const checkAlphabetParam = [param("alphabet").trim(), validate];
