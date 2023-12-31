import { useState, useEffect, useCallback } from "react";
import { Table, Button, Modal, Form, Select, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  assign_shift_to_employee,
  employeelist_url,
  shift_list,
  remove_shift_from_employee,
} from "api";
import { dataFormatter, patchRequest, getRequest, IShift } from "service";
import { toast } from "react-toastify";
import { User, defaulUser, useAuth } from "context";

const { Column } = Table;
const { Option } = Select;

const ScheduleUi = () => {
  const { user } = useAuth();
  const [shifts, setShifts] = useState<IShift[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedSupervisor, setSelectedSupervisor] =
    useState<User>(defaulUser);

  const fetchShifts = useCallback(async () => {
    try {
      const response = await getRequest<IShift[]>(shift_list);
      setShifts(response?.payload);
    } catch (error) {
      toast.error("Error fetching Shifts");
    }
  }, []);

  const fetchEmployee = useCallback(async () => {
    try {
      const response = await getRequest<User[]>(employeelist_url);
      setEmployees(
        response?.payload?.filter((data) => data?.role === "EMPLOYEE")
      );
    } catch (error) {
      toast.error("Error fetching Employee");
    }
  }, []);

  useEffect(() => {
    if (user.role === "ADMINISTRATOR") {
      fetchEmployee();
    } else if (user.role === "SUPERVISOR") {
      setEmployees(user?.myEmployees);
    }
  }, [fetchEmployee, user]);

  useEffect(() => {
    fetchShifts();
  }, [fetchShifts]);

  const handleAddEmployee = async (values: any) => {
    try {
      await patchRequest(assign_shift_to_employee(selectedSupervisor?._id), {
        employeeId: values.employee,
      });
      setVisible(false);
      toast.success("Employee added to shift successfully");
      fetchShifts();
    } catch (error) {
      toast.error("Error: Employee shift overlapping");
    }
  };

  const handleRemoveEmployee = async (shiftId: string, employeeId: string) => {
    try {
      await patchRequest(remove_shift_from_employee(shiftId), {
        employeeId: employeeId,
      });
      fetchShifts();
      toast.success("Employee removed from this shift successfully");
    } catch (error) {
      toast.error("Error untagremoving employee from shift");
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
      <h2>Schedule List</h2>
      <Table dataSource={dataFormatter(shifts)}>
        <Column title="Scheduler Name" dataIndex="name" key="name" />
        <Column title="Scheduler Date" dataIndex="date" key="date" />
        <Column
          title="Scheduler Start Time"
          dataIndex="startTime"
          key="startTime"
        />
        <Column title="Scheduler End Time" dataIndex="endTime" key="endTime" />
        <Column
          title="Employee(s)"
          dataIndex="assignedEmployees"
          key="assignedEmployees"
          render={(employees: User[], record: User) => (
            <div>
              {employees?.map((employee) => (
                <div key={employee._id} style={{ marginBottom: "8px" }}>
                  <Tag
                    closable
                    onClose={() =>
                      handleRemoveEmployee(record._id, employee._id)
                    }
                  >
                    {employee.name} - {employee.email}
                  </Tag>
                </div>
              ))}
              <Button
                onClick={() => handleAddButtonClick(record)}
                icon={<PlusOutlined />}
              />
            </div>
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

export default ScheduleUi;
