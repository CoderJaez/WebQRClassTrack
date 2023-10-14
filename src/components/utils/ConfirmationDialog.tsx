import React from "react";
import { Button, Group, Modal } from "@mantine/core";

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
    <Modal.Root opened={open} onClose={onClose} size="sm">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title style={{ textTransform: "capitalize" }}>
            {title}
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          {message}
          <Group justify="flex-end" pt="sm">
            <Button variant="light" onClick={onClose} size="xs">
              Cancel
            </Button>
            <Button variant="filled" onClick={onConfirm} size="xs">
              Confirm
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ConfirmationDialog;
