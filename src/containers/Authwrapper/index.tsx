import { Navigate, Outlet } from "react-router-dom";
import Main from "../Main";
import { getStorageItem } from "../../utils/common-utils";

const AuthWrapper = () => {
  let isActiveUser = false;

  const activeUser = getStorageItem("activeUser");
  if (activeUser) {
    isActiveUser = true;
  }

  if (isActiveUser) {
    return (
      <Main>
        <Outlet />
      </Main>
    );
  }

  const path = "/signin";
  return <Navigate to={path} replace />;
};

export default AuthWrapper;
