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
import useOccupancy from "@services/OccupancyService";
import useOccupancyStore from "@store/occupancy.store";

const OccupancyPage: React.FC = () => {
  const [isConfirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { occupancies, setOccupancies } = useOccupancyStore();
  const { getOccupancies } = useOccupancy();

  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  const handleConfirmAction = async () => {
    handleCloseConfirmationDialog();
  };

  const fetchData = async (_search: string) => {
    try {
      const result = await getOccupancies(_search);
      setOccupancies(result);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      fetchData(search);
    }
  };
  useEffect(() => {
    fetchData(search);
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
      <Card shadow="sm" p="md" radius="sm">
        <Card.Section>
          <Title order={2} p="sm">
            Occupancies
          </Title>
          <Group justify="space-between" m="md">
            <TextInput
              placeholder="Search by: lastname or room no"
              onKeyDown={onSearchHandler}
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              rightSection={
                search !== "" ? (
                  <X
                    onClick={() => {
                      setSearch("");
                      fetchData("");
                    }}
                  />
                ) : null
              }
            />
          </Group>
        </Card.Section>

        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th>Instructor</Table.Th>
              <Table.Th>Room </Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Date</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {occupancies.map((occ) => (
              <Table.Tr key={occ._id}>
                <Table.Td>
                  <Checkbox />
                </Table.Td>
                <Table.Td>
                  <Group gap="sm">
                    <Avatar src={occ.image_path} size="sm" />
                    <Text style={{ fontWeight: "bold" }}>{occ.instructor}</Text>
                  </Group>
                </Table.Td>
                <Table.Td>{occ.roomNo}</Table.Td>
                <Table.Td>
                  <Badge color={!occ.isVacant ? "cyan" : "red"}>
                    {!occ.isVacant ? "Vacant" : "Occupied"}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Text size="sm">
                    <span style={{ fontWeight: "bold" }}>Time In:</span>
                    {moment(occ.createdAt.toString()).format(
                      " MM DD, YYYY hh:mm:ss a",
                    )}
                  </Text>
                  <Text size="sm">
                    <span style={{ fontWeight: "bold" }}>Time Out:</span>
                    {occ.createdAt != occ.updatedAt
                      ? moment(occ.updatedAt.toString()).format(
                          " MM DD, YYYY hh:mm:ss a",
                        )
                      : null}
                  </Text>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default OccupancyPage;
