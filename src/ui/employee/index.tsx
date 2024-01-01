import { useState, useEffect, useCallback } from "react";
import { Table, Space, Button } from "antd";
import { employee_delete, employeelist_url, profile_update } from "api";
import { User, useAuth } from "context";
import {
  dataFormatter,
  deleteRequest,
  getRequest,
  patchRequest,
} from "service";
import EditModal from "./edit";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const EmployeeUi = () => {
  const { user, refetchProfile } = useAuth();
  const [employeeList, setEmployeeList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<User | null>(null);
  const [visible, setVisible] = useState(false);

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await getRequest<User[]>(employeelist_url);
      setEmployeeList(response.payload);
    } catch (error) {
      toast.error("Error fetching employee");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user.role === "ADMINISTRATOR") {
      fetchEmployees();
    } else if (user.role === "SUPERVISOR") {
      setEmployeeList(user?.myEmployees);
      setLoading(false);
    }
  }, [fetchEmployees, user]);

  const handleDelete = async (employeeId: string) => {
    try {
      await deleteRequest(employee_delete(employeeId));
      fetchEmployees();
    } catch (error) {
      toast.error("Error deleting employee");
    }
  };

  const handleEdit = (employee: User) => {
    setSelectedEmployee(employee);
    setVisible(true);
  };

  const handleEditSubmit = async (editedData: User) => {
    try {
      await patchRequest<User>(profile_update(editedData._id), editedData);
      if (user.role === "ADMINISTRATOR") {
        fetchEmployees();
      } else if (user.role === "SUPERVISOR") {
        refetchProfile();
      }
      setVisible(false);
      setSelectedEmployee(null);
    } catch (error) {
      toast.error("Error editing employee");
    }
  };

  // Define columns for the Ant Design table
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            icon={<EditOutlined />}
          />
          <Button
            type="primary"
            onClick={() => handleDelete(record._id)}
            icon={<DeleteOutlined />}
            disabled={user?.role !== "ADMINISTRATOR"}
          />
        </Space>
      ),
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Employee List</h2>
      <Table dataSource={dataFormatter(employeeList)} columns={columns} />
      {selectedEmployee && (
        <EditModal
          visible={visible}
          onCancel={() => {
            setVisible(false);
            setSelectedEmployee(null);
          }}
          onOk={handleEditSubmit}
          initialValues={selectedEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeUi;
