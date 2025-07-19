import type { JSX } from "react";

export interface RouteProps {
  key: string;
  path: string;
  component: JSX.Element;
}
