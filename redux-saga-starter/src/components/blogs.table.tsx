import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import BlogCreateModal from "@/components/modal/blog.create.modal";
import BlogEditModal from "@/components/modal/blog.edit.modal";
import BlogDeleteModal from "@/components/modal/blog.delete.modal";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchBlogsPending } from "@/redux/blog";
import SpinnerComponent from "./shared/spinner";
import { IBlog } from "@/models/blog.model";

function BlogsTable() {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [dataBlog, setDataBlog] = useState({});

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { isPending, data } = useAppSelector((state) => state.blog);

  useEffect(() => {
    dispatch(fetchBlogsPending());
  }, []);

  const blogs: IBlog[] = data;

  const handleEditBlog = (blog: any) => {
    setDataBlog(blog);
    setIsOpenUpdateModal(true);
  };

  const handleDelete = (blog: any) => {
    setDataBlog(blog);
    setIsOpenDeleteModal(true);
  };

  return (
    <SpinnerComponent isPending={isPending}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "15px 0",
        }}
      >
        <h4>Table Blogs</h4>
        <Button variant="primary" onClick={() => setIsOpenCreateModal(true)}>
          Add New
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Author</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog) => {
            return (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>{blog.content}</td>

                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEditBlog(blog)}
                    className="mb-3"
                  >
                    Edit
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button variant="danger" onClick={() => handleDelete(blog)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <BlogCreateModal
        isOpenCreateModal={isOpenCreateModal}
        setIsOpenCreateModal={setIsOpenCreateModal}
      />

      <BlogEditModal
        isOpenUpdateModal={isOpenUpdateModal}
        setIsOpenUpdateModal={setIsOpenUpdateModal}
        dataBlog={dataBlog}
      />

      <BlogDeleteModal
        dataBlog={dataBlog}
        isOpenDeleteModal={isOpenDeleteModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
      />
    </SpinnerComponent>
  );
}

export default BlogsTable;
