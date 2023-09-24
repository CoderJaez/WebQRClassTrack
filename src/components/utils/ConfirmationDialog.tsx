import React from "react";
import { Button, Group, Modal, Text } from "@mantine/core";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (value: any | null) => void;
  title: string;
  message: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Modal opened={open} onClose={onClose} size="xs" title={title}>
      <Modal.Body>
        <Text>{message}</Text>
      </Modal.Body>
      <Group justify="flex-end">
        <Button variant="light" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="filled" onClick={onConfirm}>
          Confirm
        </Button>
      </Group>
    </Modal>
  );
};

export default ConfirmationDialog;
