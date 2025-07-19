import { Route } from "react-router-dom";
import type { RouteProps } from "./route-types";

export const prepareAppRoutes = (appRoutes: RouteProps[]) => {
  const routes = appRoutes.map(({ key, path, component }: RouteProps) => {
    return <Route key={key} path={path} element={component} />;
  });

  return routes;
};
