import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const BASE_URL = 'http://localhost:8080'
  const handleLoginForm = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Send a request to the login endpoint using Axios
      const response = await axios.get(`${BASE_URL}/users/login`, {
        headers: {
          Authorization: `Basic ${btoa(`${email}:${password}`)}`
        }
      });

      if (response.status === 200) {
        // Retrieve the JWT token from the response
        const { token } = response.data;
        console.log(token)

        // Store the token securely (e.g., in localStorage)
        localStorage.setItem("token", token);

        // Redirect to the protected admin route
        window.location.href = '/admin'
      } else {
        // Handle login error
        console.error("Login failed");
      }
    } catch (error) {
      // Handle login error
      console.error("Login failed", error);
    }
  };
  return (
    <div className="bg-gray-800 flex justify-center items-center h-screen">
      <div className="bg-black p-20 m-2 shadow-md rounded-md">
        <h2 className="text-2xl text-white font-bold mb-4">Login</h2>
        <form onSubmit={handleLoginForm}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block font-semibold mb-2 text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
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
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="border-gray-300 border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            className="bg-[#001529] text-white rounded-md px-4 py-3 w-full mt-6 text-center"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
