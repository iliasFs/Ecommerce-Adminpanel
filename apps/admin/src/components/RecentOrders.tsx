import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
interface DataType {
  key: React.Key;
  name: string;
  product: number;
  status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "id",
    dataIndex: "key",
    width: 150,
  },
  {
    title: "Name",
    dataIndex: "name",
    width: 150,
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const data1: DataType[] = [];
for (let i = 0; i < 100; i++) {
  data1.push({
    key: i,
    name: `Customer ${i}`,
    product: 32,
    status: `Order ${i} Completed`,
  });
}
const RecentOrders = () => {
  return (
    <div className="mt-4">
      <h3 className="mb-4 font-bold text-xl">Recent Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default RecentOrders;
