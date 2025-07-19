import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { appRoutes, registrationRoutes } from "./routes";

import Loader from "./components/Loader";
import AuthWrapper from "./containers/Authwrapper";
import { prepareAppRoutes } from "./routes/app-route-utils";

const AppContainer = () => {
  const authRoutes = prepareAppRoutes(registrationRoutes);
  const mainRoutes = prepareAppRoutes(appRoutes);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<AuthWrapper />}>
          {mainRoutes}
        </Route>
        {authRoutes}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppContainer;
