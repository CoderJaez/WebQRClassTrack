import React from "react";
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Group,
  Image,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import logo from "@assets/logo.png";
import useAuthStore from "store/auth";
import { User } from "types";
import { Form, useForm } from "@mantine/form";
const LoginPage: React.FC = () => {
  const { login } = useAuthStore();

  const form = useForm<Omit<User, "_id" | "role">>({
    validateInputOnChange: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value === "" ? "Password is required" : null),
    },
  });

  const onSubmitHandler = async (user: Omit<User, "_id" | "role">) => {
    const result = await login(user.email, user.password);
    console.log(result);
  };
  return (
    <Container size={420} my={40}>
      <Title>Welcome back!</Title>
      <form onSubmit={form.onSubmit(onSubmitHandler)}>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />

          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
};

export default LoginPage;
