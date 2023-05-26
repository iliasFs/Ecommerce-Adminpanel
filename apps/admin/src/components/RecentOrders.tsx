import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import axios from "axios";
interface DataType {
  key: string;
  id: number;
  order_id: number;
  fullName: string;
  name: string;
  adress: string;
  address: string;
  phone: number;
  phone_num: number;
  quantity: number;
  total: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Order ID",
    dataIndex: "order_id",
    width: 120,
  },
  {
    title: "Name",
    dataIndex: "name",
    width: 200,
  },
  {
    title: "Address",
    dataIndex: "address",
    width: 300,
  },
  {
    title: "Phone",
    dataIndex: "phone",
    width: 150,
  },
  {
    title: "Total",
    dataIndex: "total",
    width: 150,
  },
];

const Orders = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/orders")
      .then((response) => setData(response.data));
  }, []);

  const data1: DataType[] = [];
  for (let i = 0; i < data.length; i++) {
    data1.push({
      key: i.toString(), // key for the iteration that is required from react
      id: data[i].id,
      order_id: data[i].id,
      fullName: data[i].fullName,
      name: data[i].fullName,
      adress: data[i].adress,
      address: data[i].adress,
      phone: data[i].phone,
      phone_num: data[i].phone,
      quantity: data[i].quantity,
      total: data[i].quantity,
    });
  }

  return (
    <div className="mt-4">
      <h3 className="mb-4 font-bold text-xl pl-1">Orders</h3>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
