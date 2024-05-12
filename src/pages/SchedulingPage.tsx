import {
  Container,
  Text,
  Flex,
  Button,
  Modal,
  Grid,
  Fieldset,
  Select,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";

const SchedulingPage: React.FC = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container fluid p="lg">
      <Modal title="Schedule" opened={opened} onClose={close} size="70vw">
        <Grid>
          <Grid.Col span={6}>
            <Fieldset title="New Schedule">
              <Select
                label="Day"
                placeholder="Pick day"
                data={["Mon", "Tue", "Wed", "Thu", "Fri"]}
                multiple
              />
            </Fieldset>
          </Grid.Col>
          <Grid.Col span={6}>List</Grid.Col>
        </Grid>
      </Modal>

      <Text size="lg" className="text-gray-600">
        Schedules
      </Text>
      <Flex gap="sm" align="center" justify="flex-end">
        <Button onClick={open}>New Schedule</Button>
      </Flex>
    </Container>
  );
};

export default SchedulingPage;
