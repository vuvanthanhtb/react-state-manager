import React, { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import SpinnerComponent from "@/components/spinner";
import { SERVER } from "@/configs/env.constants";
import { IBlogCreate } from "@/model/blog.model";
import { toast } from "react-toastify";

interface IBlogCreateProps {
  isOpenCreateModal: boolean;
  setIsOpenCreateModal: (value: boolean) => void;
}

const BlogCreateModal: React.FC<IBlogCreateProps> = (
  props: IBlogCreateProps
) => {
  const { isOpenCreateModal, setIsOpenCreateModal } = props;

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: IBlogCreate) => {
      const res = await fetch(`${SERVER}/blogs`, {
        method: "POST",
        body: JSON.stringify({
          title: payload.title,
          author: payload.author,
          content: payload.content,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.json();
    },
    onSuccess: () => {
      setIsOpenCreateModal(false);
      toast.success("Create blog successfully");
      setTitle("");
      setAuthor("");
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["fetchBlogs"] });
    },
  });

  const handleSubmit = () => {
    if (!title) {
      alert("title empty");
      return;
    }
    if (!author) {
      alert("author empty");
      return;
    }
    if (!content) {
      alert("content empty");
      return;
    }
    mutation.mutate({ title, author, content });
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
          <Modal.Title>Add A New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Title" className="mb-3">
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </FloatingLabel>
          <FloatingLabel label="Author" className="mb-3">
            <Form.Control
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
            />
          </FloatingLabel>
          <FloatingLabel label="Content">
            <Form.Control
              value={content}
              onChange={(e) => setContent(e.target.value)}
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

export default BlogCreateModal;
