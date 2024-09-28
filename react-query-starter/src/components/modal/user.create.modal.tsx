import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { SERVER } from "@/configs/env.constants";
import { QUERY_KEY } from "@/configs/keys.config";
import { IUserCreate } from "@/model/user.model";
import SpinnerComponent from "@/components/spinner";

interface IUserCreateProps {
  isOpenCreateModal: boolean;
  setIsOpenCreateModal: (value: boolean) => void;
}

const UserCreateModal: React.FC<IUserCreateProps> = (
  props: IUserCreateProps
) => {
  const { isOpenCreateModal, setIsOpenCreateModal } = props;

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: IUserCreate) => {
      const res = await fetch(`${SERVER}/users`, {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          name: payload.name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.json();
    },
    onSuccess: () => {
      setIsOpenCreateModal(false);
      toast.success("Create user successfully");
      setEmail("");
      setName("");
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.getUserPagination(),
      });
    },
  });

  const handleSubmit = () => {
    if (!email) {
      alert("email empty");
      return;
    }
    if (!name) {
      alert("name empty");
      return;
    }

    mutation.mutate({
      email,
      name,
    });
  };

  return (
    <SpinnerComponent isPending={mutation.isPending}>
      <Modal
        show={isOpenCreateModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop={false}
        onHide={() => setIsOpenCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add A New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Email" className="mb-3">
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          </FloatingLabel>
          <FloatingLabel label="Name">
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => setIsOpenCreateModal(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </SpinnerComponent>
  );
};

export default UserCreateModal;
