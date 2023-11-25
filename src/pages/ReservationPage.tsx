import React, { useState } from "react";
import {
  Container,
  Card,
  Group,
  Table,
  Title,
  TextInput,
  ActionIcon,
  Tooltip,
  Select,
} from "@mantine/core";
// import { useForm } from "@mantine/form";
import moment from "moment";
// import { useDisclosure } from "@mantine/hooks";
import { Trash } from "tabler-icons-react";
import { ToastContainer, toast } from "react-toastify";
import { ConfirmationDialog } from "@components/utils";
import { Action } from "types";
import useReservationStore from "@store/reservation.store";
import useReservationService from "@services/ReservationService";

type confirmDialogContent = {
  title: string;
  message: string;
};

const ReservationPage: React.FC = () => {
  const [reservationId, setReservationId] = useState("");
  const [status, setStatus] = useState("");
  const [eventAction, setEventAction] = useState<Action>(Action.DELETE);
  const [confirmMessage, setConfirmMessage] = useState<confirmDialogContent>({
    title: "Delete Confirmation",
    message: "Are you sure you want to proceed?",
  });
  const { reservations } = useReservationStore();
  const { getReservations, deleteReservation, updateReservationStatus } =
    useReservationService();
  const [search, setSearch] = useState("");
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleConfirmAction = async () => {
    switch (eventAction) {
      case Action.DELETE:
        await deleteReservation(reservationId)
          .then((res) => toast.success(res.message as string))
          .catch((err) => toast.warning(err.message as string));
        break;
      case Action.RESERVATION_STATUS:
        await updateReservationStatus(reservationId, status)
          .then((res) => toast.success(res.message as string))
          .catch((err) => toast.warning(err.message as string));
        break;
      default:
        break;
    }
    setConfirmationDialogOpen(false);
  };

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const fetchData = async (search: string) => {
    await getReservations(search);
  };

  const onSearchHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      fetchData(search);
    }
  };

  // const form = useForm({
  //   validateInputOnChange: true,
  //   initialValues: { roomNo: "" },
  //   validate: {
  //     roomNo: (value) =>
  //       value.trim().length !== 0 ? null : "Room no is required",
  //   },
  // });

  // const onSubmitHandler = async (values: typeof form.values) => {};

  React.useEffect(() => {
    const abortController = new AbortController();
    fetchData("");
    return () => {
      abortController.abort();
    };
  }, []);

  const setReservationStatus = (id: string, status: string) => {
    setReservationId(id);
    setStatus(status);
    setConfirmMessage({
      title: `${status.toLowerCase()} confirmation`,
      message: `Do you want to ${status.toLowerCase()} the reservation?`,
    });
    setEventAction(Action.RESERVATION_STATUS);
    setConfirmationDialogOpen(true);
  };

  const action = (id: string) => {
    return (
      <Group justify="row">
        <Tooltip label="Delete Reservation">
          <ActionIcon
            variant="filled"
            color="red"
            aria-label="delete"
            onClick={() => {
              setReservationId(id);
              setConfirmMessage({
                title: "Delete Confirmation",
                message: "Do you want to delete the reservation?",
              });
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
        title={confirmMessage?.title}
        message={confirmMessage?.message}
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
                <Table.Th w={200}>Status</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {reservations.map((e) => (
                <Table.Tr key={e._id}>
                  <Table.Td>{e.event.toLocaleUpperCase()}</Table.Td>
                  <Table.Td>{e.classroom}</Table.Td>
                  <Table.Td>{e.instructor.toUpperCase()}</Table.Td>
                  <Table.Td>
                    {moment(e?.dateFrom).format("MMMM DD, YYYY (hh:mm:ss a - ")}
                    {moment(e?.dateTo).format("hh:mm:ss a)")}
                  </Table.Td>
                  <Table.Td>
                    <Select
                      variant="unstyled"
                      style={{
                        backgroundColor:
                          e.status === "pending"
                            ? "#F59F00"
                            : e.status === "approve" || e.status === "occupied"
                            ? "#339AF0"
                            : "#FF6B6B",
                        paddingInline: 10,
                        borderRadius: 5,
                        color: "#F8F9FA",
                      }}
                      onChange={(selectedValue: string) => {
                        if (selectedValue !== e.status.toUpperCase()) {
                          setReservationStatus(
                            e._id,
                            selectedValue.toLowerCase(),
                          );
                        }
                      }}
                      data={["PENDING", "APPROVE", "DENY", "OCCUPIED"]}
                      defaultValue={e.status.toUpperCase()}
                      allowDeselect={false}
                      disabled={e.status === "occupied"}
                    />
                  </Table.Td>
                  <Table.Td>
                    {e.status !== "occupied" ? action(e._id):null}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>

        {/* <Modal
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
        </Modal> */}
      </Card>
    </Container>
  );
};

export default ReservationPage;
