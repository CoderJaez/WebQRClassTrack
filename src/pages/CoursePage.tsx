import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Button,
  Modal,
  Fieldset,
  TextInput,
  Select,
  Title,
  Table,
  Tooltip,
  Flex,
  Group,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useProgramService from "@services/ProgramService";
import { useForm } from "@mantine/form";
import { Course, Program } from "types";
import Swal from "sweetalert2";
import useProgramStore from "@store/program.store";
import useCourseService from "@services/CourseService";
import useCourseStore from "@store/course.store";
import { Edit, Trash } from "tabler-icons-react";
import moment from "moment";

const CoursePage: React.FC = () => {
  const [courseId, setCourseId] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure();
  const { getProgram } = useProgramService();
  const { programs } = useProgramStore();
  const { courses } = useCourseStore();
  const { getCourses, addCourse, updateCourse, deletCourse } =
    useCourseService();
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Confirmation",
      text: "Do want to delete selected course?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        Swal.fire({
          title: "Loading",
          allowOutsideClick: true,
          didOpen: () => {
            Swal.showLoading();
            deletCourse(id)
              .then((result) => {
                Swal.fire("Success", result.message as string, "success");
              })
              .catch((err) => {
                console.log(err);
                Swal.fire("Opps!", "Something went wrong", "error");
              });
          },
        });
      }
    });
  };

  const action = (id: string) => {
    return (
      <Group justify="row">
        <Tooltip label="Edit Classroom">
          <ActionIcon variant="filled" color="yellow" aria-label="edit">
            <Edit
              onClick={() => {
                const course = courses.find((prev) => prev._id === id);
                setCourseId(course?._id as string);
                form.setFieldValue("sem", course?.sem as string);
                form.setFieldValue("description", course?.code as string);
                form.setFieldValue("code", course?.description as string);
                form.setFieldValue("programId", course?.program?._id as string);
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

  useEffect(() => {
    Swal.fire({
      title: "Loading",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (programs.length <= 0) {
          getProgram();
        }
        getCourses();
        Swal.close();
      },
    });
  }, []);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: { code: "", description: "", sem: "", programId: "" },
    validate: {
      programId: (value) =>
        value.trim().length !== 0 ? null : "Program is required",
      code: (value) => (value.trim().length !== 0 ? null : "Code is required"),
      sem: (value) => (value.trim().length !== 0 ? null : "Sem is required"),
      description: (value) =>
        value.trim().length !== 0 ? null : "Description is required",
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    Swal.fire({
      title: "Confirmation",
      text: "Do you want to save it now?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
      icon: "question",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        Swal.fire({
          title: "Loading",
          text: "Please wait saving your data.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
            const data: Course = {
              sem: values.sem,
              description: values.description,
              code: values.code,
              program: programs.find((p) => p._id === values.programId),
            };
            if (courseId) {
              updateCourse(courseId, data)
                .then((result) => {
                  Swal.fire("Success", result.message as string, "success");
                  form.reset();
                })
                .catch((err) => {
                  console.log(err);
                  Swal.fire("Opps!", "Something went wrong", "error");
                });
              return;
            }
            addCourse(data)
              .then((result) => {
                Swal.fire("Success", result.message as string, "success");
                form.reset();
              })
              .catch((err) => {
                console.log(err);
                Swal.fire("Opps!", "Something went wrong", "error");
              });
          },
        });
      }
    });
  };
  return (
    <Container fluid p="md">
      <Modal opened={opened} onClose={close} title="Course" size="lg">
        <Fieldset>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Select
              data={["1st", "2nd"]}
              {...form.getInputProps("sem")}
              label="Sem"
            />
            <Select
              label="Program"
              data={programs.map((program: Program) => ({
                value: program._id as string,
                label: program.name,
              }))}
              {...form.getInputProps("programId")}
            />
            <TextInput
              label="Name"
              placeholder="E.g. BSCS"
              {...form.getInputProps("code")}
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
        <Card.Section withBorder>
          <Title order={2} p="md">
            Courses
          </Title>
          <Flex justify="flex-end" align="center">
            <Button
              onClick={() => {
                setCourseId(null);
                open();
              }}
            >
              New program
            </Button>
          </Flex>

          <Table.ScrollContainer minWidth={700}>
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Code</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th>Program</Table.Th>
                  <Table.Th>Sem</Table.Th>
                  <Table.Th>Date created</Table.Th>
                  <Table.Th>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {courses.map((course: Course, index: number) => (
                  <Table.Tr key={index}>
                    <Table.Td>{course.code}</Table.Td>
                    <Table.Td>{course.description}</Table.Td>
                    <Table.Td>{course.program?.name}</Table.Td>
                    <Table.Td>{course.sem}</Table.Td>
                    <Table.Td>
                      {moment(course.createdAt).format("MM/D/yyyy")}
                    </Table.Td>
                    <Table.Td>{action(course._id as string)}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Card.Section>
      </Card>
    </Container>
  );
};

export default CoursePage;
