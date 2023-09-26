import React from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  Container,
  Card,
  Button,
  Title,
  Text,
  Modal,
  Group,
  Table,
  PasswordInput,
  TextInput,
  Select,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { UserInfo } from "types";
import useUser from "@services/UserService";

const UserPage: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { loading, addUser } = useUser();

  const handleSubmit = async (values: Omit<UserInfo, "id" | "image_path">) => {
    //Do nothing yet.
    await addUser(values)
      .then((res) => {
        toast.success(res.message as string);
      })
      .catch((err) => {
        if (err.status === 400) {
          err.message.forEach((msg: any) =>
            form.setFieldError(msg.field, msg.message),
          );
        } else {
          toast.error(err.message as string);
        }
      });
  };

  const form = useForm<Omit<UserInfo, "id" | "image_path">>({
    validateInputOnChange: true,
    initialValues: {
      firstname: "",
      middlename: "",
      lastname: "",
      email: "",
      password: "",
      role: "",
      contact_no: "",
    },
    validate: {
      firstname: (value) =>
        value === undefined || value === ""
          ? "Firstname is required"
          : value.length < 2
          ? "Must at least 2 characters."
          : null,
      lastname: (value) =>
        value === undefined || value === ""
          ? "Lastname is required"
          : value.length < 2
          ? "Must at least 2 characters."
          : null,
      contact_no: (value) =>
        value === undefined || value.trim() === ""
          ? "Contact number is required"
          : value.length < 11 || value.length > 11
          ? "Invalid contact number"
          : !/^09\d*$/.test(value)
          ? "Invalid contact number"
          : null,
      email: (value) =>
        value === undefined || value.trim() === ""
          ? "Email is required"
          : !/^\S+@\S+$/.test(value)
          ? "Invalid email"
          : null,
      password: (value) =>
        value === undefined || value.trim() === ""
          ? "Password is required"
          : value.length < 8
          ? "Must at least 8 characters"
          : null,
      role: (value) =>
        value === undefined || value === null ? "User Type is required" : null,
    },
  });

  return (
    <Container fluid p="lg">
      <ToastContainer />
      <Card shadow="sm" p="md" radius="sm">
        <Card.Section>
          <Title order={2} p="sm">
            Users
          </Title>
          <Group justify="space-between" m="md">
            <Button onClick={open}>Add new user</Button>
            <TextInput
              placeholder="Search"
              // onKeyDown={onSearchHandler}
              // onChange={(e: any) => setSearch(e.target.value)}
            />
          </Group>
        </Card.Section>
        <Table.ScrollContainer minWidth={700}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Image</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Contact No</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>User Type</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
          </Table>
        </Table.ScrollContainer>
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        title="Users"
        closeOnClickOutside={false}
        closeOnEscape
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Firstname"
              placeholder="Eg. John"
              {...form.getInputProps("firstname")}
            />
            <TextInput label="Middlenane" placeholder="Eg. M" />
            <TextInput
              label="Lastname"
              placeholder="Eg. Doe"
              {...form.getInputProps("lastname")}
            />
            <TextInput
              label="Contact No"
              placeholder="Eg. 0912456077"
              {...form.getInputProps("contact_no")}
            />
            <TextInput
              label="Email"
              placeholder="Eg. youremail@gmail.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter password"
              {...form.getInputProps("password")}
            />
            <Select
              label="User type"
              data={["Admin", "Instructor"]}
              {...form.getInputProps("role")}
            />
            <Button type="submit" loading={loading}>
              Save
            </Button>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
};

export default UserPage;
