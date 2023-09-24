import React, { useState, useEffect } from "react";
import { NavLink, AppShell } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { navLinks } from "@routes/routes";

const SideNav: React.FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("dasboard");

  useEffect(() => {
    const paths = window.location.pathname.split("/");
    const currentPath =
      paths.length > 0 ? paths[paths.length - 1] : "dashboard";
    setActive(currentPath);
  }, []);

  return (
    <AppShell.Navbar>
      {navLinks.map((nav, index) => (
        <NavLink
          key={index}
          label={nav.label}
          leftSection={nav.leftSection}
          active={nav.label.toLowerCase() === active.toLowerCase()}
          onClick={() => {
            setActive(nav.label);
            navigate(nav.path);
          }}
          color="green"
          variant="filled"
        />
      ))}
    </AppShell.Navbar>
  );
};

export default SideNav;
