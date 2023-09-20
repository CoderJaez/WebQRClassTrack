import React from "react";

export interface Route {
  label: string;
  path: string;
  component: React.ReactElement | null;
}
