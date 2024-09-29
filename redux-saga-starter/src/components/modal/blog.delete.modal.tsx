import { useEffect } from "react";
import { toast } from "react-toastify";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import SpinnerComponent from "@/components/shared/spinner";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteBlogPending, fetchBlogsPending } from "@/redux/blog";

const BlogDeleteModal = (props: any) => {
  const { dataBlog, isOpenDeleteModal, setIsOpenDeleteModal } = props;

  const dispatch = useAppDispatch();
  const { isPending, isDeleteSuccess } = useAppSelector((state) => state.blog);

  useEffect(() => {
    if (isDeleteSuccess) {
      setIsOpenDeleteModal(false);
      toast.success("Delete blog successfully");
      dispatch(fetchBlogsPending());
    }
  }, [isDeleteSuccess]);

  const handleSubmit = () => {
    if (dataBlog) {
      dispatch(deleteBlogPending(dataBlog?.id));
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
