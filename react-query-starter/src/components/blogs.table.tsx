import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { useQuery } from "@tanstack/react-query";

import SpinnerComponent from "@/components/spinner";
import BlogEditModal from "@/components/modal/blog.edit.modal";
import BlogCreateModal from "@/components/modal/blog.create.modal";
import BlogDeleteModal from "@/components/modal/blog.delete.modal";
import TablePagination from "@/components/pagination/table.pagination";

import { PAGE_SIZE } from "@/configs/app.constants";
import { SERVER } from "@/configs/env.constants";
import { IBlog } from "@/model/blog.model";

function BlogsTable() {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [dataBlog, setDataBlog] = useState<IBlog>();

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const pageSize: number = PAGE_SIZE;

  const { isPending, error, data } = useQuery({
    queryKey: ["fetchBlogs", currentPage],
    queryFn: (): Promise<IBlog[]> =>
      fetch(`${SERVER}/blogs?_page=${currentPage}&_limit=${pageSize}`).then(
        (res) => {
          const totalItems: number = +(res.headers.get("X-Total-Count") ?? 0);
          const totalPagesTemp: number =
            totalItems === 0 ? 0 : (totalItems - 1) / pageSize + 1;
          setTotalPages(totalPagesTemp);
          return res.json();
        }
      ),
  });

  if (error) return "An error has occurred: " + error.message;

  const blogs: Array<IBlog> = data || [];

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
          {blogs.map((blog) => {
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

      <TablePagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

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
