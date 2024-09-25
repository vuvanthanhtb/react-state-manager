import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { deleteBlog } from "../../redux/blog/blog.slice";
import { resetDeleteSuccess } from "../../redux/user/user.slice";

const BlogDeleteModal = (props: any) => {
  const { dataBlog, isOpenDeleteModal, setIsOpenDeleteModal } = props;

  const dispatch = useAppDispatch();
  const isDeleteSuccess = useAppSelector((state) => state.blog.isDeleteSuccess);

  useEffect(() => {
    if (isDeleteSuccess) {
      setIsOpenDeleteModal(false);
      resetDeleteSuccess();
      toast.success("Delete blog successfully");
    }
  }, [isDeleteSuccess]);

  const handleSubmit = () => {
    dispatch(deleteBlog(dataBlog?.id));
  };

  return (
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
  );
};

export default BlogDeleteModal;
