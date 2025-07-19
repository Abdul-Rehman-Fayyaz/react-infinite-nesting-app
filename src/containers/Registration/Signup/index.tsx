import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { useCallback, useState } from "react";
import useLabels from "../../../hooks/use-labels";
import type { AuthFromProps, FormFields } from "../registration-types";
import { initialRegistationFields } from "../registration-utils";
import {
  getSubmissionData,
  validateRegistrationFields,
} from "../validate-inputs";
import { isEmpty } from "lodash";
import Notification from "../../../components/Notification";
import TitleDescriptionBox from "../../../components/TitleDescriptionBox";

const { Password } = Input;

const Signup = ({ updateAuthForm }: AuthFromProps) => {
  const {
    signupLabel,
    enterYourSignupLabel,
    enterEmailLabel,
    donotHaveAccount,
    enterPasswordLabel,
    signinLabel,
  } = useLabels([
    "signupLabel",
    "enterYourSignupLabel",
    "enterEmailLabel",
    "donotHaveAccount",
    "enterPasswordLabel",
    "signinLabel",
  ]);

  const [form] = Form.useForm();
  const [formFields, setFormFields] = useState<FormFields>(
    initialRegistationFields
  );

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const onChangeHandler = useCallback(
    (value: string, id: keyof FormFields) => {
      setFormFields((prev) => ({ ...prev, [id]: value }));
      if (errors?.[id]) {
        setErrors((prev) => (prev ? { ...prev, [id]: "" } : null));
      }
    },
    [errors]
  );

  const onFinishHandler = () => {
    const { required, fieldsData } = getSubmissionData(formFields);

    if (!isEmpty(required)) {
      setErrors(required);
    } else {
      onSubmit(fieldsData);
    }
  };

  const onSubmit = async (fieldsData: Record<string, string>) => {
    const { valid, errors } = await validateRegistrationFields(fieldsData);
    if (valid) {
      console.log("onfinish", formFields);
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="registration-content sign-up">
      <TitleDescriptionBox
        className="register-meta"
        title={signupLabel}
        description={enterYourSignupLabel}
      />
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinishHandler}
        className="collaborator-form registration-form"
      >
        <Input
          className="form-element form-email-element"
          onChange={(e) => onChangeHandler(e.target.value, "email")}
          value={formFields["email"]}
          placeholder={enterEmailLabel}
        />

        {errors && (
          <Notification
            message={errors["email"]}
            className="error-notification"
          />
        )}

        <Password
          className="form-element form-password-element"
          placeholder={enterPasswordLabel}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onChange={(e) => onChangeHandler(e.target.value, "password")}
          value={formFields["password"]}
        />

        {errors && (
          <Notification
            message={errors["password"]}
            className="error-notification"
          />
        )}
      </Form>
      <Button
        type="primary"
        onClick={() => form.submit()}
        className="sign-up-btn"
        size="large"
      >
        <span>{signupLabel}</span>
      </Button>
      <div className="account-existence-info" onClick={updateAuthForm}>
        {donotHaveAccount}
        <span>{signinLabel}</span>
      </div>
    </div>
  );
};

export default Signup;
