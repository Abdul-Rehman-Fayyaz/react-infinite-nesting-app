import { lazy } from "react";

const Registration = lazy(() => import("../pages/Registration"));
const Books = lazy(() => import("../containers/Main/Book"));

export const registrationRoutes = [
  {
    key: "signin",
    path: "/signin",
    component: <Registration />,
  },
];

export const appRoutes = [
  {
    key: "books",
    path: "/books",
    component: <Books />,
  },
];
