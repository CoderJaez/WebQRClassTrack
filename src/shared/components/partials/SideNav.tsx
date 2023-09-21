import React, { useState } from "react";
import { NavLink, AppShell } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { navLinks } from "@routes/routes";

const SideNav: React.FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  return (
    <AppShell.Navbar>
      {navLinks.map((nav, index) => (
        <NavLink
          key={index}
          label={nav.label}
          leftSection={nav.leftSection}
          active={index === active}
          onClick={() => {
            setActive(index);
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
