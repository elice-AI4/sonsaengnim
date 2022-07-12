import { param, body } from "express-validator";
import { validate } from "./result";

export const handValidate = [
  body("english")
    .exists()
    .withMessage("영어 항목이 없습니다.")
    .bail()
    .trim()
    .notEmpty()
    .isLength({ min: 1 })
    .withMessage("공백입니다. 입력된 영어이 없습니다.")
    .bail()
    .isString()
    .withMessage("string 으로 입력해주세요."),
  body("handImage")
    .exists()
    .withMessage("handImage 항목이 없습니다.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("공백입니다. 입력된 handImage가 없습니다."),
  // .isURL()
  body("mouthImage")
    .exists()
    .withMessage("mouthImage 항목이 없습니다.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("공백입니다. 입력된 mouthImage가 없습니다.")
    .bail(),
  // .isURL()
  body("video")
    .exists()
    .withMessage("video 항목이 없습니다.")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("공백입니다. 입력된 video가 없습니다.")
    .bail(),
  // .isURL()
  validate,
];

export const checkEnglishParam = [param("english").trim(), validate];
