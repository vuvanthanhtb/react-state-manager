import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import SpinnerComponent from "@/components/spinner";
import { SERVER } from "@/configs/env.constants";
import { IUser } from "@/model/user.model";

interface IUserDeleteProps {
  dataUser: IUser | undefined;
  isOpenDeleteModal: boolean;
  setIsOpenDeleteModal: (value: boolean) => void;
}

const UserDeleteModal: React.FC<IUserDeleteProps> = (
  props: IUserDeleteProps
) => {
  const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: number) => {
      const res = await fetch(`${SERVER}/users/${payload}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.json();
    },
    onSuccess: () => {
      setIsOpenDeleteModal(false);
      toast.success("Delete user successfully");
      queryClient.invalidateQueries({ queryKey: ["fetchUsers"] });
    },
  });

  const handleSubmit = () => {
    if (dataUser) {
      mutation.mutate(dataUser.id);
    }
  };

  return (
    <SpinnerComponent isPending={mutation.isPending}>
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
