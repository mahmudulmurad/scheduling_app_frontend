// ShiftComponent.jsx
import { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
} from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { create_shift, update_shift, delete_shift, shift_list } from "api"; // Replace with your actual API functions
import moment from "moment";
import {
  dataFormatter,
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "service";
import { toast } from "react-toastify";

const { Column } = Table;

interface IShift {
  _id: string;
  name: string;
  startTime: string;
  endTime: string;
  date: string;
}

const ShiftUi = () => {
  const [shifts, setShifts] = useState<IShift[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingShift, setEditingShift] = useState<IShift | null>(null);

  useEffect(() => {
    fetchShifts();
  }, []);

  const fetchShifts = async () => {
    try {
      const response = await getRequest(shift_list);
      setShifts(response?.payload as IShift[]);
    } catch (error) {
      toast.error("Error fetching shifts");
    }
  };

  const handleCreate = () => {
    form.resetFields();
    setVisible(true);
    setEditingShift(null);
  };

  const handleEdit = (shift: any) => {
    form.setFieldsValue({
      name: shift.name,
      startTime: moment(shift.startTime, "HH:mm"),
      endTime: moment(shift.endTime, "HH:mm"),
      date: moment(shift.date, "YYYY-MM-DD"),
    });
    setVisible(true);
    setEditingShift(shift);
  };

  const handleDelete = async (shiftId: string) => {
    try {
      await deleteRequest(delete_shift(shiftId));
      fetchShifts();
    } catch (error) {
      toast.error("Error deleting shifts");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        name: values.name,
        startTime: values.startTime.format("HH:mm"),
        endTime: values.endTime.format("HH:mm"),
        date: values.date.format("YYYY-MM-DD"),
      };

      if (editingShift) {
        await patchRequest(update_shift(editingShift?._id), data);
      } else {
        await postRequest(create_shift, data);
      }

      setVisible(false);
      fetchShifts();
    } catch (error) {
      toast.error("Error creating/updating shift");
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <h2>Shift List</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleCreate}
        style={{ margin: "10px 16px", float: "right" }}
      >
        Create Shift
      </Button>

      <Table dataSource={dataFormatter(shifts)}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Start Time" dataIndex="startTime" key="startTime" />
        <Column title="End Time" dataIndex="endTime" key="endTime" />
        <Column title="Date" dataIndex="date" key="date" />
        <Column
          title="Actions"
          key="actions"
          render={(text, record: IShift) => (
            <span>
              <Button
                onClick={() => handleEdit(record)}
                icon={<EditOutlined />}
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(record._id)}
                icon={<DeleteOutlined />}
              >
                Delete
              </Button>
            </span>
          )}
        />
      </Table>

      <Modal
        title={editingShift ? "Edit Shift" : "Create Shift"}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            startTime: moment("00:00", "HH:mm"),
            endTime: moment("00:00", "HH:mm"),
          }}
        >
          <Form.Item
            name="name"
            label="Shift Name"
            rules={[{ required: true, message: "Please enter the shift name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="startTime"
            label="Start Time"
            rules={[
              { required: true, message: "Please select the start time" },
            ]}
          >
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="endTime"
            label="End Time"
            rules={[{ required: true, message: "Please select the end time" }]}
          >
            <TimePicker format="HH:mm" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="date"
            label="Shift Date"
            rules={[
              { required: true, message: "Please select the shift date" },
            ]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ShiftUi;
