import React from "react";
import {
  Container,
  Button,
  Card,
  Image,
  Text,
  Group,
  Table,
  Title,
  Modal,
} from "@mantine/core";
import moment from "moment";
import useClassroom from "@services/ClassroomService";
import useClassroomStore from "store/classroom.store";
import { useDisclosure } from "@mantine/hooks";

const ClassroomPage: React.FC = () => {
  const { loading, getClassroom } = useClassroom();
  const { classrooms, setClassrooms } = useClassroomStore();
  const [opened, { open, close }] = useDisclosure(false);

  const fetchData = async () => {
    await getClassroom()
      .then((res) => {
        setClassrooms(res);
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const rows = React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container fluid p="lg">
      <Card shadow="sm" p="md" radius="sm" withBorder>
        <Card.Section>
          <Title order={2} p="sm">
            Classrooms
          </Title>
          <Button onClick={open}>New Classroom</Button>
        </Card.Section>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Room No</Table.Th>
              <Table.Th>Occupied</Table.Th>
              <Table.Th>Created At</Table.Th>
              <Table.Th>Updated At</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {!loading ? (
              classrooms.map((element) => (
                <Table.Tr key={element._id}>
                  <Table.Td>{element.roomNo.toUpperCase()}</Table.Td>
                  <Table.Td>
                    {element.isOccupied ? "Occupied" : "Vacant"}
                  </Table.Td>
                  <Table.Td>
                    {moment(element.createdAt.toString()).format(
                      "MM DD, YYYY hh:mm:ss a",
                    )}
                  </Table.Td>
                  <Table.Td>
                    {moment(element.updatedAt.toString()).format(
                      "MM DD, YYYY hh:mm:ss a",
                    )}
                  </Table.Td>
                  <Table.Td>hello</Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Text>Loading</Text>
            )}
          </Table.Tbody>
        </Table>

        <Modal
          opened={opened}
          onClose={close}
          title="Classroom"
          centered
        ></Modal>
      </Card>
    </Container>
  );
};

export default ClassroomPage;
