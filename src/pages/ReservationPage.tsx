import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import ActionButtons from "@components/utils/ActionButtons";
import { ConfirmationDialog } from "@components/utils";
import {
  Container,
  Card,
  Title,
  TextInput,
  Group,
  Checkbox,
  Text,
  Table,
  Avatar,
  Badge,
} from "@mantine/core";
import { X } from "tabler-icons-react";
import moment from "moment";
import { useDisclosure } from "@mantine/hooks";

const ReservationPage: React.FC = () => {
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirmAction = async () => {
    handleCloseConfirmationDialog();
  };
  const onSearchHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      //  fetchData(search);
    }
  };

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
            Reservations
          </Title>
          <Group justify="space-between" m="md">
            <TextInput
              placeholder="Search Instructor name or room"
              onKeyDown={onSearchHandler}
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              rightSection={
                search !== "" ? (
                  <X
                    onClick={() => {
                      setSearch("");
                      // fetchData("");
                    }}
                  />
                ) : null
              }
            />
          </Group>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Instructor</Table.Th>
                <Table.Th>Classroom</Table.Th>
                <Table.Th>Reservation Date</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
          </Table>
        </Card.Section>
      </Card>
    </Container>
  );
};

export default ReservationPage;
