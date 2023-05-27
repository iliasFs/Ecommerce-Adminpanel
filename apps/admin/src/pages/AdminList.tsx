import React, { useState, useEffect } from "react";
import { Card, Row, Col, Table, Space, Button, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

interface User {
  id: number;
  name: string;
  email: string;
}

const BASE_URL = "http://localhost:8080";

const AdminList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);

 

  useEffect(() => {
    const storedLoggedInUserId = Number(localStorage.getItem("loggedInUserId"));
    setLoggedInUserId(storedLoggedInUserId)
    fetchUsers();
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      if (loggedInUserId !== id) {
        await axios.delete(`${BASE_URL}/users/${id}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, user: User) => {
        const isCurrentUser = user.id === loggedInUserId;
        return (
          <Space size="middle">
            {!isCurrentUser ? (
              <Link to={`/admin/edit-admin/${user.id}`}>
                <BiEdit size={20} />
              </Link>
            ) : (
              <BiEdit size={20} style={{ opacity: 0.5, pointerEvents: "none" }} />
            )}
            {!isCurrentUser ? (
              <Button
                icon={<RiDeleteBin5Line />}
                type="primary"
                danger
                onClick={() => handleDelete(user.id)}
              />
            ) : (
              <Button
                icon={<RiDeleteBin5Line />}
                type="primary"
                danger
                disabled
              />
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </>
  );
};

export default AdminList;
