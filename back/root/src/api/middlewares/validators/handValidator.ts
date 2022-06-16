import { param, body } from "express-validator";
import { validate } from "./result";

export const handValidate = [
  body("alphabet").exists().trim().notEmpty().withMessage("알파벳 항목이 없습니다."),
  body("handImage").exists().trim().notEmpty().withMessage("handImage가 없습니다."), // body("handImage").isURL()
  body("mouthImage").exists().trim().notEmpty().withMessage("mouthImage가 없습니다."), // body("handImage").isURL()
  body("video").exists().trim().notEmpty().withMessage("video가 없습니다."), // body("handImage").isURL()
  validate,
];

export const checkAlphabetParam = [param("alphabet").trim(), validate];
