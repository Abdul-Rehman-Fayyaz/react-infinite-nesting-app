import validator from "validator";
import { getLabel } from "../hooks/use-labels";

export const fieldValidator = {
  email: (value: string) => validator.isEmail(value),
};

export const errorMessage = {
  email: getLabel("INVALID_EMAIL"),
  password: getLabel("INVALID_PASSWORD"),
};
