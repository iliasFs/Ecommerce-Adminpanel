import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";


const ResetPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('')
  const BASE_URL = 'http://localhost:8080'
  const handleLoginForm = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };
 
  return (
    <div className="bg-gray-800 flex justify-center items-center h-screen">
      <div className="bg-black p-20 m-2 shadow-md rounded-md">
        <h2 className="text-2xl text-white font-bold mb-4">Reset Password!</h2>
        {errorMessage&& <p className="mb-4 text-red-500">{errorMessage}</p>}
        <form onSubmit={handleLoginForm}>
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
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-semibold mb-2 text-white"
            >
              Confirm Password
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
            Reset
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
