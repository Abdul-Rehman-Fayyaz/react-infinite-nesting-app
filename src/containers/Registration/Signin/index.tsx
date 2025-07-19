import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { isEmpty } from "lodash";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLabels from "../../../hooks/use-labels";
import type { AuthFromProps, FormFields } from "../registration-types";
import { initialRegistationFields, sampleLogins } from "../registration-utils";
import {
  getSubmissionData,
  validateRegistrationFields,
} from "../validate-inputs";

import Notification from "../../../components/Notification";
import TitleDescriptionBox from "../../../components/TitleDescriptionBox";

const { Password } = Input;

const Signin = ({ updateAuthForm }: AuthFromProps) => {
  const navigate = useNavigate();

  const {
    signinLabel,
    enterYourSigninLabel,
    enterEmailLabel,
    haveAlreadyAccount,
    enterPasswordLabel,
    signupLabel,
    demoAccountsLabel,
  } = useLabels([
    "signinLabel",
    "enterYourSigninLabel",
    "enterEmailLabel",
    "haveAlreadyAccount",
    "enterPasswordLabel",
    "signupLabel",
    "emailLabel",
    "passwordLabel",
    "demoAccountsLabel",
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
      const { email } = fieldsData;

      const role = email.includes("author") ? "AUTHOR" : "COLLABORATOR";

      localStorage.setItem(
        "activeUser",
        JSON.stringify({
          isApproved: true,
          userName: "HARF",
          email: email,
          userRole: role,
        })
      );
      navigate("/books");
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="registration-content sign-in">
      <TitleDescriptionBox
        className="register-meta"
        title={signinLabel}
        description={enterYourSigninLabel}
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
        className="sign-in-btn"
        size="large"
      >
        <span>{signinLabel}</span>
      </Button>
      <div className="account-existence-info" onClick={updateAuthForm}>
        {haveAlreadyAccount}
        <span>{signupLabel}</span>
      </div>

      <div className="demo-accounts">{demoAccountsLabel}:</div>
      {sampleLogins.map((item) => {
        const { email, password, key } = item;
        return (
          <TitleDescriptionBox
            key={key}
            title={email}
            subTitle="/"
            description={password}
            className="sample-logins"
          />
        );
      })}
    </div>
  );
};

export default Signin;
