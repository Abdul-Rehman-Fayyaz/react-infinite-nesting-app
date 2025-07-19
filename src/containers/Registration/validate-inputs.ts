import { errorMessage, fieldValidator } from "../../utils/validation";

interface ValidationProps {
  valid: boolean;
  errors: Record<string, string>;
}

export const validateRegistrationFields = async (
  fieldData: Record<string, string>
): Promise<ValidationProps> => {
  let valid = true;
  const errors: Record<string, string> = {};

  const { email, password } = fieldData;
  if (email && !fieldValidator.email(email)) {
    valid = false;
    errors["email"] = errorMessage.email;
  }

  if (password && password !== "password") {
    valid = false;
    errors["password"] = errorMessage.password;
  }
  return { valid, errors };
};

export const getSubmissionData = (formFields: Record<string, string>) => {
  const required: Record<string, string> = {};

  const { email, password } = formFields;

  if (!email) {
    required["email"] = "Required!";
  }

  if (!password) {
    required["password"] = "Required!";
  }

  return {
    required,
    fieldsData: formFields,
  };
};
