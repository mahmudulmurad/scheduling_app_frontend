import { useState, useEffect, useCallback } from "react";
import { Table, Space, Button } from "antd";
import { employee_role_change, employeelist_url } from "api";
import { User, useAuth } from "context";
import { dataFormatter, getRequest, patchRequest } from "service";
import EditModal from "./edit";
import { EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const EmployeeListForRoleChange = () => {
  const { user } = useAuth();
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
    fetchEmployees();
  }, [fetchEmployees, user]);

  const handleEdit = (employee: User) => {
    setSelectedEmployee(employee);
    setVisible(true);
  };

  const handleEditSubmit = async (editedData: User) => {
    try {
      await patchRequest<User>(
        employee_role_change(editedData._id),
        editedData
      );
      fetchEmployees();
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
      title: "Role",
      dataIndex: "role",
      key: "role",
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

export default EmployeeListForRoleChange;
