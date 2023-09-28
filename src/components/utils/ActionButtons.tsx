import { ActionIcon, Group } from "@mantine/core";
import React from "react";
import { Edit, Trash } from "tabler-icons-react";

interface ActionProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionProps> = ({ onEdit, onDelete }) => {
  return (
    <>
      <Group justify="row">
        <ActionIcon
          variant="filled"
          color="yellow"
          aria-label="edit"
          onClick={onEdit}
        >
          <Edit style={{ width: "70%", height: "70%" }} strokeWidth={1.5} />
        </ActionIcon>
        <ActionIcon
          variant="filled"
          color="red"
          aria-label="delete"
          onClick={onDelete}
        >
          <Trash style={{ width: "70%", height: "70%" }} strokeWidth={1.5} />
        </ActionIcon>
      </Group>
    </>
  );
};

export default ActionButtons;
