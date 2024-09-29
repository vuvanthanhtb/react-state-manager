import { useEffect } from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import SpinnerComponent from "@/components/shared/spinner";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteUserPending, fetchUsersPending } from "@/redux/user";

const UserDeleteModal = (props: any) => {
  const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;

  const dispatch = useAppDispatch();
  const { isPending, isDeleteSuccess } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isDeleteSuccess) {
      setIsOpenDeleteModal(false);
      toast.success("Delete user successfully");
      dispatch(fetchUsersPending());
    }
  }, [isDeleteSuccess]);

  const handleSubmit = () => {
    if (dataUser) {
      dispatch(deleteUserPending(dataUser.id));
    }
  };

  return (
    <SpinnerComponent isPending={isPending}>
      <Modal
        show={isOpenDeleteModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop={false}
        onHide={() => setIsOpenDeleteModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete A User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete the user: {dataUser?.email ?? ""}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => setIsOpenDeleteModal(false)}
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

export default UserDeleteModal;
