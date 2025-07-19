import { useState } from "react";
import useLabels from "../../hooks/use-labels";

import Signin from "./Signin";
import Signup from "./Signup";

import "./styles.css";

const Registration = () => {
  const [authFormm, setAuthForm] = useState("signin");

  const { brandNameLabel, platformLabel } = useLabels([
    "brandNameLabel",
    "platformLabel",
  ]);

  const toggleAuthForm = () => {
    setAuthForm((prev) => (prev === "signin" ? "signup" : "signin"));
  };

  const renderComponent: { [key: string]: React.ReactNode } = {
    signin: <Signin updateAuthForm={toggleAuthForm} />,
    signup: <Signup updateAuthForm={toggleAuthForm} />,
  };

  return (
    <div className="registratin-container">
      <div className="brand-name">
        {brandNameLabel} - {platformLabel}
      </div>

      {renderComponent[authFormm]}
    </div>
  );
};

export default Registration;
