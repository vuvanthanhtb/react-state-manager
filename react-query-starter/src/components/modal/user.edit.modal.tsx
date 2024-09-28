import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { IUser } from "@/model/user.model";
import { SERVER } from "@/configs/env.constants";
import SpinnerComponent from "@/components/spinner";

interface IUserEditProps {
  dataUser: IUser | undefined;
  isOpenUpdateModal: boolean;
  setIsOpenUpdateModal: (value: boolean) => void;
}

const UserEditModal: React.FC<IUserEditProps> = (props: IUserEditProps) => {
  const { isOpenUpdateModal, setIsOpenUpdateModal, dataUser } = props;

  const [id, setId] = useState<number>(-1);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: IUser) => {
      const res = await fetch(`${SERVER}/users/${payload.id}`, {
        method: "PUT",
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
      setIsOpenUpdateModal(false);
      toast.success("Update user successfully");
      queryClient.invalidateQueries({ queryKey: ["fetchUsers"] });
    },
  });

  useEffect(() => {
    if (dataUser) {
      setId(dataUser.id);
      setEmail(dataUser.email);
      setName(dataUser.name);
    }
  }, [dataUser]);

  const handleSubmit = () => {
    if (!email) {
      alert("email empty");
      return;
    }
    if (!name) {
      alert("name empty");
      return;
    }
    mutation.mutate({ id, email, name });
  };

  return (
    <SpinnerComponent isPending={mutation.isPending}>
      <Modal
        show={isOpenUpdateModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop={false}
        onHide={() => setIsOpenUpdateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update A User</Modal.Title>
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
            onClick={() => setIsOpenUpdateModal(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button onClick={() => handleSubmit()}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </SpinnerComponent>
  );
};

export default UserEditModal;
