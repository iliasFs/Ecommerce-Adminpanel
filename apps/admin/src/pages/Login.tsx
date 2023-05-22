import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="bg-gray-800 flex justify-center items-center h-screen">
      <div className="bg-black p-20 m-2 shadow-md rounded-md">
        <h2 className="text-2xl text-white font-bold mb-4">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block font-semibold mb-2 text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="border-gray-300 border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-semibold mb-2 text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border-gray-300 border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <Link
            to="/admin"
            type="button"
            className="bg-[#001529] text-white rounded-md px-4 py-3 w-full mt-6 text-center"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
