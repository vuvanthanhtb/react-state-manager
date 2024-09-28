import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SpinnerComponent from "../spinner";
import { SERVER } from "@/configs/env.constants";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import React from "react";
import { IBlog } from "@/model/blog.model";

interface IBlogDeleteProps {
  dataBlog: IBlog | undefined;
  isOpenDeleteModal: boolean;
  setIsOpenDeleteModal: (value: boolean) => void;
}

const BlogDeleteModal: React.FC<IBlogDeleteProps> = (
  props: IBlogDeleteProps
) => {
  const { dataBlog, isOpenDeleteModal, setIsOpenDeleteModal } = props;

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: number) => {
      const res = await fetch(`${SERVER}/blogs/${payload}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.json();
    },
    onSuccess: () => {
      setIsOpenDeleteModal(false);
      toast.success("Delete blog successfully");
      queryClient.invalidateQueries({ queryKey: ["fetchBlogs"] });
    },
  });

  const handleSubmit = () => {
    if (dataBlog) {
      mutation.mutate(dataBlog.id);
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
          <Modal.Title>Delete A Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete the blog: {dataBlog?.title ?? ""}</Modal.Body>
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

export default BlogDeleteModal;
