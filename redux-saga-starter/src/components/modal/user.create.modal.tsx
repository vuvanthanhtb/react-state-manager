import { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import SpinnerComponent from "@/components/shared/spinner";

import { createUserPending, fetchUsersPending } from "@/redux/user";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";

const UserCreateModal = (props: any) => {
  const { isOpenCreateModal, setIsOpenCreateModal } = props;

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const dispatch = useAppDispatch();
  const { isPending, isCreateSuccess } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isCreateSuccess) {
      setEmail("");
      setName("");
      setIsOpenCreateModal(false);
      toast.success("Create user successfully");
      dispatch(fetchUsersPending());
    }
  }, [isCreateSuccess]);

  const handleSubmit = () => {
    if (!email) {
      alert("email empty");
      return;
    }
    if (!name) {
      alert("name empty");
      return;
    }

    dispatch(createUserPending({ email, name }));
  };

  return (
    <SpinnerComponent isPending={isPending}>
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
