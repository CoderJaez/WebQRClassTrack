import React, { useEffect, useState } from "react";
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
  Avatar,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { UserInfo } from "types";
import useUser from "@services/UserService";
import useUserStore from "store/user.store";
import ActionButtons from "@components/utils/ActionButtons";
import { ConfirmationDialog } from "@components/utils";

const UserPage: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { loading, addUser, updateUser, getUsers, removeUser } = useUser();
  const [userId, setUserId] = useState<null | string>(null);
  const { users, add, setUsers, remove } = useUserStore();
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    await getUsers(search).then((res) => {
      setUsers(res);
    });
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirmAction = async () => {
    await removeUser(userId as string)
      .then((res) => {
        toast.success(res.message as string);
        remove(userId as string);
      })
      .catch((err) => {
        toast.error(err.message);
      });

    handleCloseConfirmationDialog();
  };

  const onSearchHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      fetchData();
    }
  };

  const handleSubmit = async (
    values: Omit<UserInfo, "_id" | "image_path" | "password">,
  ) => {
    try {
      if (!userId) {
        await addUser(values)
          .then((res) => {
            toast.success(res.message as string);
            add(res.user as UserInfo);
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
      } else {
        await updateUser(userId, values)
          .then((res) => {
            toast.success(res.message as string);
            const updatedUser = {
              ...values,
              ...{ _id: userId as string },
            } as UserInfo;
            const updatedUsers = users.map((user) =>
              user._id === userId ? updatedUser : user,
            );
            setUsers(updatedUsers);
            setUserId(null);
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = (id: string) => {
    const user = users.find((user) => user._id === id) as UserInfo;
    setUserId(id as string);
    form.setFieldValue("firstname", user.firstname);
    form.setFieldValue("middlename", user.middlename);
    form.setFieldValue("lastname", user.lastname);
    form.setFieldValue("email", user.email);
    form.setFieldValue("contact_no", user.contact_no);
    form.setFieldValue("role", user.role.toUpperCase());
    open();
  };

  const deleteUser = (id: string) => {
    setUserId(id);
    setConfirmationDialogOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const form = useForm<Omit<UserInfo, "_id" | "image_path" | "password">>({
    validateInputOnChange: true,
    initialValues: {
      firstname: "",
      middlename: "",
      lastname: "",
      email: "",
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

      role: (value) =>
        value === undefined || value === null ? "User Type is required" : null,
    },
  });

  return (
    <Container fluid p="lg">
      <ToastContainer />
      <ConfirmationDialog
        open={isConfirmationDialogOpen}
        onClose={handleCloseConfirmationDialog}
        onConfirm={handleConfirmAction}
        title="Delete Confirmation"
        message="Are you sure you want to proceed?"
      />
      <Card shadow="sm" p="md" radius="sm">
        <Card.Section>
          <Title order={2} p="sm">
            Users
          </Title>
          <Group justify="space-between" m="md">
            <Button
              onClick={() => {
                form.reset();
                open();
              }}
            >
              Add new user
            </Button>
            <TextInput
              placeholder="Search"
              onKeyDown={onSearchHandler}
              onChange={(e: any) => setSearch(e.target.value)}
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
            <Table.Tbody>
              {users.map((user, index) => (
                <Table.Tr key={index}>
                  <Table.Td>
                    <Avatar src={user.image_path} size="md" />
                  </Table.Td>
                  <Table.Td>{`${user.firstname.toUpperCase()} ${
                    user.middlename ?? user.middlename
                  } ${user.lastname.toUpperCase()}`}</Table.Td>
                  <Table.Td>{user.contact_no}</Table.Td>
                  <Table.Td>{user.email}</Table.Td>
                  <Table.Td>{user.role}</Table.Td>
                  <Table.Td>
                    <ActionButtons
                      onEdit={() => editUser(user._id)}
                      onDelete={() => deleteUser(user._id)}
                    />
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
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
            <TextInput
              label="Middlenane"
              placeholder="Eg. M"
              {...form.getInputProps("middlename")}
            />
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
            {/* <PasswordInput
              label="Password"
              placeholder="Enter password"
              {...form.getInputProps("password")}
            /> */}
            <Select
              label="User type"
              data={["ADMIN", "INSTRUCTOR"]}
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
