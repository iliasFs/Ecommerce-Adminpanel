import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import axios from "axios";
interface DataType {
  key: number;
  id: number;
  customer_id: number;
  fullName: string;
  name: string;
  adress: string;
  address: string;
  phone: number;
  phone_num: number;
  email: string;
  cust_email: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Customer ID",
    dataIndex: "customer_id",
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
    title: "Email",
    dataIndex: "email",
    width: 150,
  },
];

const Customers = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/orders")
      .then((response) => setData(response.data));
  }, []);


  const data1: DataType[] = [];
  for (let i = 0; i < data.length; i++) {
    data1.push({
      key: i,
      id: i,
      customer_id: i + 1,
      fullName: data[i].fullName,
      name: data[i].fullName,
      adress: data[i].adress,
      address: data[i].adress,
      phone: data[i].phone,
      phone_num: data[i].phone,
      cust_email: data[i].email,
      email: data[i].email,
    });
  }

  
  return (
    <div className="mt-4">
      <h3 className="mb-4 font-bold text-xl pl-1">Customers</h3>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Customers;
