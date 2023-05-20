import { BsArrowDownRight, BsArrowUpRight } from "react-icons/bs";
import RecentOrders from "../components/RecentOrders";
import RevenueGraph from "../components/RevenueGraph";

const Dashboard = () => {
  return (
    <div>
      <h3 className="text-3xl mb-4">Dashboard</h3>
      <div className="flex justify-between items-center gap-3">
        <div className="flex flex-grow-1 justify-between items-center bg-white p-3 rounded-lg">
          <div className="flex flex-col gap-4">
            <p className="mb-0">Total</p>
            <h4 className="text-xl">1440$</h4>
          </div>
          <div className="flex flex-col items-end gap-4">
            <h6 className="flex green">
              <BsArrowUpRight />
              36%
            </h6>
            <p className="mb-0">Compare to April 2022</p>
          </div>
        </div>
        <div className="flex flex-grow-1 justify-between items-center bg-white p-3 rounded-lg">
          <div className="flex flex-col gap-4">
            <p className="mb-0">Total</p>
            <h4 className="text-xl mb-0">1440$</h4>
          </div>
          <div className="flex flex-col items-end gap-4">
            <h6 className="flex red">
              <BsArrowDownRight />
              36%
            </h6>
            <p className="mb-0">Compared to June 2022</p>
          </div>
        </div>
        <div className="flex flex-grow-1 justify-between items-center bg-white p-3 rounded-lg">
          <div className="flex flex-col gap-4">
            <p className="mb-0">Total</p>
            <h4 className="text-xl">1440$</h4>
          </div>
          <div className="flex flex-col items-end gap-4">
            <h6 className="flex green">
              <BsArrowUpRight />
              36%
            </h6>
            <p className="mb-0">Compare to April 2022</p>
          </div>
        </div>
      </div>
      <RevenueGraph />
      <RecentOrders />
    </div>
  );
};

export default Dashboard;
