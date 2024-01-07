import { useState, useEffect, useCallback } from "react";
import { Table, DatePicker, Space, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { my_shift } from "api";
import { toast } from "react-toastify";
import { IShift, getRequest } from "service";

const MyShiftListUi = () => {
  const [shifts, setShifts] = useState<IShift[]>([]);
  const [filteredShifts, setFilteredShifts] = useState<IShift[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const fetchShifts = useCallback(async () => {
    try {
      const response = await getRequest<IShift[]>(my_shift);
      setShifts(response?.payload);
      setFilteredShifts(response?.payload);
    } catch (error) {
      toast.error("Error fetching Shifts");
    }
  }, []);

  useEffect(() => {
    fetchShifts();
  }, [fetchShifts]);

  const handleDateChange = (date: any, dateString: string) => {
    setSelectedDate(dateString);
  };

  const handleFilterByDate = () => {
    if (selectedDate) {
      const filtered = shifts.filter((shift) => shift.date === selectedDate);
      setFilteredShifts(filtered);
    } else {
      setFilteredShifts(shifts);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Start Time", dataIndex: "startTime", key: "startTime" },
    { title: "End Time", dataIndex: "endTime", key: "endTime" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  return (
    <div>
      <h2>Shift List</h2>
      <Space>
        <DatePicker onChange={handleDateChange} />
        <Button onClick={handleFilterByDate} icon={<FilterOutlined />} />
      </Space>
      <Table dataSource={filteredShifts} columns={columns} />
    </div>
  );
};

export default MyShiftListUi;
