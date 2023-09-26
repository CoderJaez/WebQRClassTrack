import { ActionIcon, Group } from "@mantine/core";
import React from "react";
import { Edit, Trash } from "tabler-icons-react";

interface ActionProps {
  id: string;
  edit: (id: string) => void;
  remove: (id: string) => void;
}

const ActionButtons: React.FC<ActionProps> = ({ id, edit, remove }) => {
  return (
    <>
      <Group justify="row">
        <ActionIcon
          variant="filled"
          color="yellow"
          aria-label="edit"
          onClick={() => edit}
        >
          <Edit style={{ width: "70%", height: "70%" }} strokeWidth={1.5} />
        </ActionIcon>
        <ActionIcon
          variant="filled"
          color="red"
          aria-label="delete"
          onClick={() => remove}
        >
          <Trash style={{ width: "70%", height: "70%" }} strokeWidth={1.5} />
        </ActionIcon>
      </Group>
    </>
  );
};

export default ActionButtons;
