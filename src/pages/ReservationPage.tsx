import React, { useState } from "react";
import {
  Container,
  Button,
  Card,
  Group,
  Table,
  Title,
  Modal,
  TextInput,
  ActionIcon,
  Stack,
  Image,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import moment from "moment";
import { useDisclosure } from "@mantine/hooks";
import { Edit, Trash } from "tabler-icons-react";
import { ToastContainer, toast } from "react-toastify";
import { ConfirmationDialog } from "@components/utils";
import { Reservation } from "types";
import useReservationStore from "@store/reservation.store";
import useReservationService from "@services/ReservationService";
const ReservationPage: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const { reservations, addReservation, removeReservation } =
    useReservationStore();
  const { getReservations, loading } = useReservationService();
  const [search, setSearch] = useState("");
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const handleConfirmAction = async () => {};
  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const fetchData = async (search: string) => {
    await getReservations(search);
    console.log(reservations);
  };

  const onSearchHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      fetchData(search);
    }
  };

  const form = useForm({
    validateInputOnChange: true,
    initialValues: { roomNo: "" },
    validate: {
      roomNo: (value) =>
        value.trim().length !== 0 ? null : "Room no is required",
    },
  });

  const onSubmitHandler = async (values: typeof form.values) => {};

  React.useEffect(() => {
    const abortController = new AbortController();
    fetchData("");
    return () => {
      abortController.abort();
    };
  }, []);
  const action = (id: string) => {
    return (
      <Group justify="row">
        <Tooltip label="Delete Reservation">
          <ActionIcon
            variant="filled"
            color="red"
            aria-label="delete"
            onClick={() => {
              setReservation(
                reservations.find((room) => room._id === id) as Reservation,
              );
              setConfirmationDialogOpen(true);
            }}
          >
            <Trash style={{ width: "70%", height: "70%" }} strokeWidth={1.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
    );
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
      <Card shadow="sm" p="md" radius="sm" withBorder>
        <Card.Section>
          <Title order={2} p="sm">
            Reservations
          </Title>
          <Group justify="space-between" m="md">
            {/* <Button
              onClick={() => {
                form.reset();
                setReservation(null);
                open();
              }}
            >
              New Classroom
            </Button> */}
            <TextInput
              placeholder="Search"
              onKeyDown={onSearchHandler}
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </Group>
        </Card.Section>
        <Table.ScrollContainer minWidth={600}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Event</Table.Th>
                <Table.Th>Room No</Table.Th>
                <Table.Th>Instructor</Table.Th>
                <Table.Th>Date & Time</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {reservations.map((e) => (
                <Table.Tr>
                  <Table.Td>{e.event.toLocaleUpperCase()}</Table.Td>
                  <Table.Td>{e.classroom}</Table.Td>
                  <Table.Td>{e.instructor.toUpperCase()}</Table.Td>
                  <Table.Td>
                    {moment(e?.dateFrom).format("MMMM DD, YYYY (hh:mm:ss a - ")}
                    {moment(e?.dateTo).format("hh:mm:ss a)")}
                  </Table.Td>
                  <Table.Td>
                    <Button
                      title={e.status.toUpperCase()}
                      color={e.status === "pending" ? "red" : ""}
                    >
                      {e.status.toUpperCase()}
                    </Button>
                  </Table.Td>
                  <Table.Td>{action(e._id)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>

        <Modal
          opened={opened}
          onClose={close}
          title="Classroom"
          closeOnClickOutside={false}
          closeOnEscape
        >
          <form onSubmit={form.onSubmit(onSubmitHandler)}>
            <Stack>
              <TextInput
                data-autofocus
                label="Room No"
                placeholder="Eg. IT102"
                {...form.getInputProps("roomNo")}
              />
              <Button type="submit" loading={false}>
                Save
              </Button>
            </Stack>
          </form>
        </Modal>
      </Card>
    </Container>
  );
};

export default ReservationPage;
