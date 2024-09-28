import Table from "react-bootstrap/Table";
import { useState, forwardRef } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { useQuery } from "@tanstack/react-query";

import SpinnerComponent from "@/components/spinner";
import UserCreateModal from "@/components/modal/user.create.modal";
import UserEditModal from "@/components/modal/user.edit.modal";
import UserDeleteModal from "@/components/modal/user.delete.modal";
import TablePagination from "@/components/pagination/table.pagination";
import { SERVER } from "@/configs/env.constants";
import { IUser } from "@/model/user.model";
import { PAGE_SIZE } from "@/configs/app.constants";

function UsersTable() {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState<IUser>();

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const pageSize: number = PAGE_SIZE;

  const { isPending, error, data } = useQuery({
    queryKey: ["fetchUsers", currentPage],
    queryFn: (): Promise<IUser[]> =>
      fetch(`${SERVER}/users?_page=${currentPage}&_limit=${pageSize}`).then(
        (res) => {
          const totalItems: number = +(res.headers.get("X-Total-Count") ?? 0);
          const totalPagesTemp: number =
            totalItems === 0 ? 0 : (totalItems - 1) / pageSize + 1;
          setTotalPages(totalPagesTemp);
          return res.json();
        }
      ),
    // staleTime: 3 * 1000,
    // placeholderData: keepPreviousData,
  });

  if (error) return "An error has occurred: " + error.message;

  const users: Array<IUser> = data || [];

  const handleEditUser = (user: any) => {
    setDataUser(user);
    setIsOpenUpdateModal(true);
  };

  const handleDelete = (user: any) => {
    setDataUser(user);
    setIsOpenDeleteModal(true);
  };

  const PopoverComponent = forwardRef((props: any, ref: any) => {
    const { id } = props;

    const { isPending, error, data } = useQuery({
      queryKey: ["gethUserById", id],
      queryFn: (): Promise<IUser> =>
        fetch(`${SERVER}/users/${id}`).then((res) => {
          return res.json();
        }),
    });

    if (error) return "An error has occurred: " + error.message;

    return (
      <Popover ref={ref} {...props}>
        <Popover.Header as="h3">Detail User</Popover.Header>
        {isPending ? (
          <Popover.Body>Loading...</Popover.Body>
        ) : (
          <Popover.Body>
            <div>ID = {id}</div>
            <div>Name = {data.name}</div>
            <div>Email = {data.email}</div>
          </Popover.Body>
        )}
      </Popover>
    );
  });

  return (
    <SpinnerComponent isPending={isPending}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "15px 0",
        }}
      >
        <h4>Table Users</h4>
        <Button variant="primary" onClick={() => setIsOpenCreateModal(true)}>
          Add New
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  rootClose
                  overlay={<PopoverComponent id={user.id} />}
                >
                  <td>
                    <a href="#">{user.id}</a>
                  </td>
                </OverlayTrigger>

                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button variant="danger" onClick={() => handleDelete(user)}>
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
      <UserCreateModal
        isOpenCreateModal={isOpenCreateModal}
        setIsOpenCreateModal={setIsOpenCreateModal}
      />

      <UserEditModal
        isOpenUpdateModal={isOpenUpdateModal}
        setIsOpenUpdateModal={setIsOpenUpdateModal}
        dataUser={dataUser}
      />

      <UserDeleteModal
        dataUser={dataUser}
        isOpenDeleteModal={isOpenDeleteModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
      />
    </SpinnerComponent>
  );
}

export default UsersTable;
