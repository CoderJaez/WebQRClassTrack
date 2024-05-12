import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Container,
  Button,
  Flex,
  Modal,
  Fieldset,
  TextInput,
  Card,
  Title,
  Table,
  ActionIcon,
  Tooltip,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useProgramStore from "@store/program.store";
import { Program, Response } from "types";
import useProgramService from "@services/ProgramService";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";
import { Edit, Trash } from "tabler-icons-react";
import Swal from "sweetalert2";

const ProgramPage: React.FC = () => {
  const [opened, { open, close }] = useDisclosure();
  const { programs } = useProgramStore();
  const [programId, setProgramId] = useState<string | null>(null);

  const { postProgram, getProgram, putProgram, removeProgram } =
    useProgramService();
  useEffect(() => {
    getProgram();
  }, []);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: { name: "", description: "" },
    validate: {
      name: (value) => (value.trim().length !== 0 ? null : "Name is required"),
      description: (value) =>
        value.trim().length !== 0 ? null : "Description is required",
    },
  });

  const action = (id: string) => {
    return (
      <Group justify="row">
        <Tooltip label="Edit Classroom">
          <ActionIcon variant="filled" color="yellow" aria-label="edit">
            <Edit
              onClick={() => {
                const program = programs.find((prev) => prev._id === id);
                setProgramId(program?._id as string);
                form.setFieldValue("name", program?.name as string);
                form.setFieldValue(
                  "description",
                  program?.description as string
                );
                open();
              }}
              style={{ width: "70%", height: "70%" }}
              strokeWidth={1.5}
            />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Delete Classroom">
          <ActionIcon
            variant="filled"
            color="red"
            aria-label="delete"
            onClick={() => handleDelete(id)}
          >
            <Trash style={{ width: "70%", height: "70%" }} strokeWidth={1.5} />
          </ActionIcon>
        </Tooltip>
      </Group>
    );
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Confirmation",
      text: "Do you want to delete seleted program?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((swalResult) => {
      if (swalResult.isConfirmed) {
        removeProgram(id)
          .then((result) => toast.success(result.message as string))
          .catch((err) => {
            console.error(err.message);
            Swal.fire("Opps!", err.message, "error");
          });
      }
    });
  };

  const handleSubmit = (values: typeof form.values) => {
    if (programId == null)
      postProgram(values as Program)
        .then((result: Response) => {
          toast.success(result.message as string);
          form.reset();
        })
        .catch((err: any) => {
          console.error("Function: ", err);
          if (err.status === 400) {
            err.message.forEach((msg: any) => {
              form.setFieldError(msg.field, msg.message);
            });
          }
        });
    else
      putProgram(programId, values as Program)
        .then((result: Response) => {
          toast.success(result.message as string);
          setProgramId(null);
          form.reset();
          close();
        })
        .catch((err: any) => {
          console.error("Function: ", err);
          if (err.status === 400) {
            err.message.forEach((msg: any) => {
              form.setFieldError(msg.field, msg.message);
            });
          }
        });
  };
  return (
    <Container fluid p="lg">
      <ToastContainer />
      <Modal opened={opened} onClose={close} title="Program" size="lg">
        <Fieldset>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Name"
              placeholder="E.g. BSCS"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Description"
              placeholder="E.g. Bachelor of Science in Computer Science"
              {...form.getInputProps("description")}
            />
            <Button type="submit" style={{ marginTop: 4 }}>
              Save
            </Button>
          </form>
        </Fieldset>
      </Modal>
      <Card>
        <Card.Section>
          <Title order={2} p="sm">
            Programs
          </Title>
          <Flex justify="flex-end" align="center">
            <Button
              onClick={() => {
                setProgramId(null);
                open();
              }}
            >
              New program
            </Button>
          </Flex>
        </Card.Section>
        <Table.ScrollContainer minWidth={700}>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Program</Table.Th>
                <Table.Th>Date created</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {programs.map((program: Program, index: number) => (
                <Table.Tr key={index}>
                  <Table.Td>{program.name}</Table.Td>
                  <Table.Td>{program.description}</Table.Td>
                  <Table.Td>
                    {moment(program.createdAt).format("MM/D/yyyy")}
                  </Table.Td>
                  <Table.Td>{action(program._id as string)}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>
    </Container>
  );
};

export default ProgramPage;
