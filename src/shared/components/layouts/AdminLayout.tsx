import React from "react";
import { Header, SideNav } from "../partials";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
const AdminLayout: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
    >
      <Header opened={opened} toggle={toggle} />
      <SideNav />
    </AppShell>
  );
};

export default AdminLayout;
