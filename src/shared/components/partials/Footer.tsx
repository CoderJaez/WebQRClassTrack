import React from "react";
import { AppShell, Text } from "@mantine/core";
const Footer: React.FC = () => {
  return (
    <AppShell.Footer h={60} p="md">
      <Text style={{ textAlign: "center", color: "GrayText" }}>
        {new Date().getFullYear()}@Copyright. All rights reserved.
      </Text>
    </AppShell.Footer>
  );
};

export default Footer;
