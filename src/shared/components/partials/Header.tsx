import {
  AppShell,
  Burger,
  Flex,
  Image,
  Menu,
  Avatar,
  Text,
  UnstyledButton,
  Group,
} from "@mantine/core";
import React, { forwardRef } from "react";
import logo from "@assets/logo.png";
import { User, Password, ChevronRight, Logout } from "tabler-icons-react";
type props = {
  opened: boolean;
  toggle: () => void;
};

interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}
const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: "var(--mantine-spacing-md)",
        color: "var(--mantine-color-text)",
        borderRadius: "var(--mantine-radius-sm)",
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <ChevronRight size="1rem" />}
      </Group>
    </UnstyledButton>
  ),
);
const Header: React.FC<props> = ({ opened, toggle }) => {
  return (
    <AppShell.Header>
      <Flex justify="space-between" align="center">
        <Flex justify="flex-start" align="center">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image src={logo} alt="QRClasstrack Logo" w={50} h={50} />
          <span>QRClassTrack</span>
        </Flex>
        <Flex
          justify="flex-start"
          align="center"
          style={{ marginRight: "1rem" }}
        >
          <Menu shadow="md">
            <Menu.Target>
              <UserButton
                image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                name="Harriette Spoonlicker"
                email="hspoonlicker@outlook.com"
              />
            </Menu.Target>
            <Menu.Dropdown style={{ minWidth: 200 }}>
              <Menu.Item
                leftSection={<User style={{ width: 20, height: 20 }} />}
              >
                Profile
              </Menu.Item>
              <Menu.Item
                leftSection={<Password style={{ width: 20, height: 20 }} />}
              >
                Account
              </Menu.Item>
              <Menu.Item
                leftSection={<Logout style={{ width: 20, height: 20 }} />}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Flex>
    </AppShell.Header>
  );
};

export default Header;
