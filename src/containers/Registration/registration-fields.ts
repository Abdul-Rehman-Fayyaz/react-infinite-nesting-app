import { getLabel } from "../../hooks/use-labels";

export const signInfieldData = () => {
  return {
    fields: {
      email: {
        elementConfigs: {
          label: getLabel("emailLabel"),
          type: "email",
          name: "email",
          className: "single-form-item email-input",
          placeHolder: getLabel("enterYourEmailLabel"),
          required: false,
        },
        value: "",
      },
    },
  };
};
