import { Column, ColumnConfig } from "@ant-design/plots";
const data = [
  {
    type: "Jan",
    sales: 38,
  },
  {
    type: "Feb",
    sales: 52,
  },
  {
    type: "Mar",
    sales: 61,
  },
  {
    type: "April",
    sales: 100,
  },
  {
    type: "May",
    sales: 48,
  },
  {
    type: "Jun",
    sales: 76,
  },
  {
    type: "Jul",
    sales: 80,
  },
  {
    type: "Aug",
    sales: 128,
  },
  {
    type: "Sep",
    sales: 65,
  },
  {
    type: "Oct",
    sales: 38,
  },
  {
    type: "Nov",
    sales: 69,
  },
  {
    type: "Dec",
    sales: 45,
  },
];
const config: ColumnConfig = {
  data,
  xField: "type",
  yField: "sales",
  label: {
    position: "middle",
    style: {
      fill: "#FFFFFF",
      opacity: 0.8,
    },
  },
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  meta: {
    type: {
      alias: "Month",
    },
    sales: {
      alias: "Income",
    },
  },
};
const RevenueGraph = () => {
  return (
    <div className="mt-8 text-xl font-bold pl-1">
      <h3 className="mb-4">Revenue Graph</h3>
      <div className="h-[620px]">
        <Column {...config} />
      </div>
    </div>
  );
};

export default RevenueGraph;
