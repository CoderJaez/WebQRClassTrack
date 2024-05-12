import React, { useState } from "react";
import {
  Card,
  Container,
  Button,
  Modal,
  Fieldset,
  TextInput,
  Select,
  Title,
  Flex,
} from "@mantine/core";
import { toast, ToastContainer } from "react-toastify";
import { useDisclosure } from "@mantine/hooks";
import useProgramService from "@services/ProgramService";
import { useForm } from "@mantine/form";
import { Course } from "types";
const CoursePage: React.FC = () => {
  const [courseId, setCourseId] = useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure();
  const { programs, getProgram } = useProgramService();

  const form = useForm({
    validateInputOnChange: true,
    initialValues: { code: "", description: "", sem: "", programId: "" },
    validate: {
      code: (value) => (value.trim().length !== 0 ? null : "Code is required"),
    },
  });

  const handleSubmit = (values: typeof form.values) => {};
  return (
    <Container fluid p="md">
      <ToastContainer />
      <Modal opened={opened} onClose={close} title="Course" size="lg">
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
        </Card.Section>
      </Card>
    </Container>
  );
};

export default CoursePage;
