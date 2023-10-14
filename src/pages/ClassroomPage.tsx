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
  Badge,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import moment from "moment";
import useClassroom from "@services/ClassroomService";
import useClassroomStore from "store/classroom.store";
import { useDisclosure } from "@mantine/hooks";
import { Edit, Download, Trash } from "tabler-icons-react";
import { Classroom } from "types";
import { ToastContainer, toast } from "react-toastify";
import { ConfirmationDialog } from "@components/utils";
import { saveAs } from "file-saver";

const ClassroomPage: React.FC = () => {
  const {
    loading,
    getClassroom,
    addClassroom,
    updateClassroom,
    removeClassroom,
  } = useClassroom();
  const { classrooms, setClassrooms, addOneClassroom, removeOneClassroom } =
    useClassroomStore();
  const [opened, { open, close }] = useDisclosure(false);
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [search, setSearch] = useState("");
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const fetchData = async (search: string) => {
    await getClassroom(search)
      .then((res) => {
        setClassrooms(res);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const form = useForm({
    validateInputOnChange: true,
    initialValues: { roomNo: "" },
    validate: {
      roomNo: (value) =>
        value.trim().length !== 0 ? null : "Room no is required",
    },
  });

  const onSubmitHandler = async (values: typeof form.values) => {
    try {
      if (classroom == null) {
        await addClassroom(values.roomNo)
          .then((res) => {
            addOneClassroom(res.data as Classroom);
            toast.success(res.message as string);
          })
          .catch((err: any) => {
            if (err.status === 400) {
              err.message.forEach((msg: any) => {
                form.setFieldError("roomNo", msg.message);
              });
            }
          });
      } else {
        await updateClassroom(values.roomNo, classroom._id)
          .then((res) => {
            const updatedClassroom = {
              ...classroom,
              ...{ roomNo: values.roomNo },
            };
            const newItems = classrooms.map((room) =>
              room._id === updatedClassroom._id ? updatedClassroom : room,
            );
            setClassrooms(newItems);
            toast.success(res.message as string);
            setClassroom(null);
            form.reset();
          })
          .catch((err: any) => {
            if (err.status === 400) {
              err.message.forEach((msg: any) => {
                form.setFieldError("roomNo", msg.message);
              });
            } else {
              toast.error(err.message);
            }
          });
      }
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
    }
  };

  const handleConfirmAction = async () => {
    // Add your logic for the confirmation action here
    // For example, delete an item or perform a critical action
    await removeClassroom(classroom?._id as string)
      .then((res) => {
        toast.success(res.message as string);
        removeOneClassroom(classroom?._id as string);
        setClassroom(null);
      })
      .catch((err: any) => {
        if (err.status === 400) {
          err.message.forEach((msg: any) => {
            form.setFieldError("roomNo", msg.message);
          });
        } else {
          toast.error(err.message);
        }
      });
    handleCloseConfirmationDialog();
  };
  const editRoom = (id: string) => {
    const _classroom = classrooms.find((room) => room._id === id);
    setClassroom(_classroom as Classroom);
    form.setFieldValue("roomNo", _classroom?.roomNo as string);
    open();
  };

  const downloadQrCode = (id: string) => {
    const classroom = classrooms.find((room) => room._id === id) as Classroom;

    const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={"code": "${classroom._id}","type": "room_qr"}`;
    saveAs(qrCode, `room_no_${classroom.roomNo}.jpg`);
  };

  const action = (id: string) => {
    return (
      <Group justify="row">
        <Tooltip label="Download">
          <ActionIcon
            variant="filled"
            color="blue"
            aria-label="download"
            onClick={() => downloadQrCode(id)}
          >
            <Download
              style={{ width: "70%", height: "70%" }}
              strokeWidth={1.5}
            />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Edit Classroom">
          <ActionIcon
            variant="filled"
            color="yellow"
            aria-label="edit"
            onClick={() => editRoom(id)}
          >
            <Edit style={{ width: "70%", height: "70%" }} strokeWidth={1.5} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete Classroom">
          <ActionIcon
            variant="filled"
            color="red"
            aria-label="delete"
            onClick={() => {
              setClassroom(
                classrooms.find((room) => room._id === id) as Classroom,
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

  const onSearchHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      fetchData(search);
    }
  };

  React.useEffect(() => {
    fetchData("");
  }, []);
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
            Classrooms
          </Title>
          <Group justify="space-between" m="md">
            <Button
              onClick={() => {
                form.reset();
                setClassroom(null);
                open();
              }}
            >
              New Classroom
            </Button>
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
                <Table.Th>QRCode</Table.Th>
                <Table.Th>Room No</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Created At</Table.Th>
                <Table.Th>Updated At</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {classrooms.map((element) => (
                <Table.Tr key={element._id}>
                  <Table.Td>
                    <Image
                      radius="md"
                      h={100}
                      w={100}
                      fit="contain"
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data={"code": "${element._id}","type": "room_qr"}`}
                    />
                  </Table.Td>
                  <Table.Td>{element.roomNo.toUpperCase()}</Table.Td>
                  <Table.Td>
                    <Badge color={!element.isOccupied ? "cyan" : "red"}>
                      {!element.isOccupied ? "Vacant" : "Occupied"}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    {moment(element.createdAt.toString()).format(
                      "MMM DD, YYYY hh:mm:ss a",
                    )}
                  </Table.Td>
                  <Table.Td>
                    {moment(element.updatedAt.toString()).format(
                      "MMM DD, YYYY hh:mm:ss a",
                    )}
                  </Table.Td>
                  <Table.Td>{action(element._id)}</Table.Td>
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
              <Button type="submit" loading={loading}>
                Save
              </Button>
            </Stack>
          </form>
        </Modal>
      </Card>
    </Container>
  );
};

export default ClassroomPage;
