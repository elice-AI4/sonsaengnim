import { body } from "express-validator";
import { validate } from "./result";

export const scoreValidator = [
  body("score")
    .exists()
    .withMessage('No "score" in your request body.')
    .bail()
    .trim()
    .notEmpty()
    .withMessage("No score input")
    .bail()
    .isNumeric()
    .withMessage("Score must be number."),
  body("time")
    .exists()
    .withMessage('No "time" in your request body.')
    .bail()
    .trim()
    .notEmpty()
    .withMessage("No time input")
    .bail()
    .isNumeric()
    .withMessage("Score must be number."),

  validate,
];

export const scoreValidatorForNonloginUser = [
  body("username")
    .exists()
    .withMessage('No "username" in your request body.')
    .bail()
    .trim()
    .notEmpty()
    .withMessage("No username input")
    .bail()
    .isString()
    .withMessage("Username must be string."),
  body("score")
    .exists()
    .withMessage('No "score" in your request body.')
    .bail()
    .trim()
    .notEmpty()
    .withMessage("No score input")
    .bail()
    .isNumeric()
    .withMessage("Score must be number."),
  body("time")
    .exists()
    .withMessage('No "time" in your request body.')
    .bail()
    .trim()
    .notEmpty()
    .withMessage("No time input")
    .bail()
    .isNumeric()
    .withMessage("Time must be number."),

  validate,
];
