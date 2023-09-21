import React from "react";
import { NavLink, AppShell } from "@mantine/core";
import {
  Gauge,
  Chalkboard,
  Dashboard,
  FileStack,
  User,
} from "tabler-icons-react";

const SideNav: React.FC = () => {
  return (
    <AppShell.Navbar p="md">
      <NavLink
        label="Dashboard"
        href="/"
        leftSection={<Dashboard size="1rem" strokeWidth={1.5} />}
      />
      <NavLink
        label="Occupancy"
        href="/occupancies"
        leftSection={<Gauge size="1rem" strokeWidth={1.5} />}
      />
      <NavLink
        label="Reservation"
        href="/reservations"
        leftSection={<FileStack size="1rem" strokeWidth={1.5} />}
      />
      <NavLink
        label="Classroom"
        href="/classrooms"
        leftSection={<Chalkboard size="1rem" strokeWidth={1.5} />}
      />
      <NavLink
        label="User"
        href="/users"
        leftSection={<User size="1rem" strokeWidth={1.5} />}
      />
    </AppShell.Navbar>
  );
};

export default SideNav;
