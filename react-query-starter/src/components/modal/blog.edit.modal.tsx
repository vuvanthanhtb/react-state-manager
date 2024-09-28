import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import { IBlog } from "@/model/blog.model";
import SpinnerComponent from "@/components/spinner";
import { SERVER } from "@/configs/env.constants";

interface IBlogEditProps {
  dataBlog: IBlog | undefined;
  isOpenUpdateModal: boolean;
  setIsOpenUpdateModal: (value: boolean) => void;
}

const BlogEditModal: React.FC<IBlogEditProps> = (props: IBlogEditProps) => {
  const { isOpenUpdateModal, setIsOpenUpdateModal, dataBlog } = props;

  const [id, setId] = useState<number>(-1);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (dataBlog) {
      setId(dataBlog?.id);
      setTitle(dataBlog?.title);
      setAuthor(dataBlog?.author);
      setContent(dataBlog?.content);
    }
  }, [dataBlog]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: IBlog) => {
      const res = await fetch(`${SERVER}/blogs/${payload.id}`, {
        method: "PUT",
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
      setIsOpenUpdateModal(false);
      toast.success("Update blog successfully");
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
    mutation.mutate({ id, title, author, content });
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
          <Modal.Title>Update A Blog</Modal.Title>
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

export default BlogEditModal;
