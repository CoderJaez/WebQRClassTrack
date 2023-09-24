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
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
const UserPage: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container fluid p="lg">
      <ToastContainer />
      <Card shadow="sm" p="md" radius="sm">
        <Card.Section>
          <Title order={2} p="sm">
            Users
          </Title>
          <Group justify="space-between" m="md">
            <Button onClick={open}>New Classroom</Button>
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
        <form>
          <Stack>
            <TextInput label="Firstname" placeholder="Eg. John" />
            <TextInput label="Middlenane" placeholder="Eg. M" />
            <TextInput label="Lastname" placeholder="Eg. Doe" />
            <TextInput label="Contact No" placeholder="Eg. 0912456077" />
            <TextInput label="Email" placeholder="Eg. youremail@gmail.com" />
            <PasswordInput label="Password" placeholder="Enter password" />
            <PasswordInput
              label="Confirm Password"
              placeholder="Re-enter password"
            />
            <Button type="submit">Save</Button>
          </Stack>
        </form>
      </Modal>
    </Container>
  );
};

export default UserPage;
