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
import useAuthStore from "store/auth";
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
  const { user } = useAuthStore();
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
                image={user?.image_path as string}
                name={`${user?.firstname.toLocaleUpperCase()} ${user?.middlename.toLocaleUpperCase()} ${user?.lastname.toLocaleUpperCase()}`}
                email={user?.email as string}
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
