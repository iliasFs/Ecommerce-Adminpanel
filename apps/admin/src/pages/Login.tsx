import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('')
  const BASE_URL = 'http://localhost:8080'
  const handleLoginForm = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
    // authentication
      const response = await axios.get(`${BASE_URL}/users/login`, {
        headers: {
          Authorization: `Basic ${btoa(`${email}:${password}`)}`
        }
      });

      if (response.status === 200) {
        
        const { token } = response.data;
        console.log(token)
        localStorage.setItem("token", token);
        
        // authorization
        const authUserResponse = await axios.get(`${BASE_URL}/users/me`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        if(authUserResponse.status===200){
          const {id,email} = authUserResponse.data
          localStorage.setItem("userEmail", email)
          localStorage.setItem("loggedInUserId", id)
          navigate('/admin')
        }else{
          console.log('Something went wrong')
        }

      } else {
       
       setErrorMessage("Invalid Credentials");
      }
    } catch (error) {
      setErrorMessage("Invalid Credentials");
    }
  };
 
  return (
    <div className="bg-gray-800 flex justify-center items-center h-screen">
      <div className="bg-black p-20 m-2 shadow-md rounded-md">
        <h2 className="text-2xl text-white font-bold mb-4">Login</h2>
        {errorMessage&& <p className="mb-4 text-red-500">{errorMessage}</p>}
        <form onSubmit={handleLoginForm}>
          <div className="mb-4">
            <label
              htmlFor="email"
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
          <Link to='/reset-password'
            className="text-gray-400 mt-2 underline"
            
          >
            Forgot Password?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
