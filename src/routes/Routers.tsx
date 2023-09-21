import { Routes, Route } from "react-router-dom";
import AdminLayout from "@shared/layouts/AdminLayout";
import routes from "./routes";

import React from "react";
import LoginPage from "@pages/LoginPage";
import NotFoundPage from "@pages/NotFoundPage";

const Routers: React.FC = () => {
  return (
    <>
      <Routes>
        <Route element={<AdminLayout />}>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.component} />
          ))}
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default Routers;
