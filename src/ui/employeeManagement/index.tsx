import { useState, useEffect, useCallback } from "react";
import { Table, Button, Modal, Form, Select, Tag } from "antd";
import {
  tag_employee_to_supervisor,
  untag_employee_from_supervisor,
  employeelist_url,
} from "api";
import { dataFormatter, patchRequest, getRequest } from "service";
import { toast } from "react-toastify";
import { User, defaulUser } from "context";

const { Column } = Table;
const { Option } = Select;

const EmployeeManagementUi = () => {
  const [supervisors, setSupervisors] = useState<User[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedSupervisor, setSelectedSupervisor] =
    useState<User>(defaulUser);

  const fetchSupervisors = useCallback(async () => {
    try {
      const response = await getRequest<User[]>(employeelist_url);
      setEmployees(
        response?.payload?.filter((data) => data?.role === "EMPLOYEE")
      );
      setSupervisors(
        response?.payload?.filter((data) => data?.role === "SUPERVISOR")
      );
    } catch (error) {
      toast.error("Error fetching supervisors");
    }
  }, []);

  useEffect(() => {
    fetchSupervisors();
  }, [fetchSupervisors]);

  const handleAddEmployee = async (values: any) => {
    try {
      await patchRequest(tag_employee_to_supervisor(selectedSupervisor?._id), {
        myEmployees: [values.employee],
      });
      setVisible(false);
      toast.success("Employee added to supervisor successfully");
      fetchSupervisors();
    } catch (error) {
      toast.error("Error adding employee to supervisor");
    }
  };

  const handleUntagEmployee = async (
    supervisorId: string,
    employeeId: string
  ) => {
    try {
      await patchRequest(untag_employee_from_supervisor(supervisorId), {
        id: employeeId,
      });
      fetchSupervisors();
      toast.success("Employee untagged from supervisor successfully");
    } catch (error) {
      toast.error("Error untagging employee from supervisor");
    }
  };

  const handleAddButtonClick = (supervisor: User) => {
    setVisible(true);
    setSelectedSupervisor(supervisor);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <h2>Supervisor Employee List</h2>
      <Table dataSource={dataFormatter(supervisors)}>
        <Column title="Supervisor Name" dataIndex="name" key="name" />
        <Column
          title="Employee(s)"
          dataIndex="myEmployees"
          key="myEmployees"
          render={(employees: User[], record: User) => (
            <span>
              {employees?.map((employee) => (
                <Tag
                  key={employee._id}
                  closable
                  onClose={() => handleUntagEmployee(record._id, employee._id)}
                >
                  {employee.name}--{employee.email}
                </Tag>
              ))}
              <Button onClick={() => handleAddButtonClick(record)}>
                Add Employee
              </Button>
            </span>
          )}
        />
      </Table>

      <Modal
        title={`Add Employee to ${selectedSupervisor?.name}`}
        visible={visible}
        onOk={() => form.submit()}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleAddEmployee}>
          <Form.Item
            name="employee"
            label="Select Employee"
            rules={[{ required: true, message: "Please select an employee" }]}
          >
            <Select>
              {employees?.map((employee) => (
                <Option key={employee._id} value={employee._id}>
                  {employee.name} - {employee.email}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EmployeeManagementUi;
