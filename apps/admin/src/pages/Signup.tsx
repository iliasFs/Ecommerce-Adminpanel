import { useState } from "react";
import axios from 'axios'
import { IUser } from "../types/userTypes";
import visibility from '../assests/svg/visibility.svg'
const Signup = () => {
  const BASE_URL = 'http://localhost:8080'
    const [showPassword, setShowPassword] = useState(false)
    const [user,setUser]=useState<IUser>({
      name: '',
      email:'',
      password:'',
      isAdmin: true
      
    })
    const {name,email,password} = user
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
      const {name,value} = e.target
      setUser((prevUserState)=>(
        {
          ...prevUserState,
          [name]:value
        }
      ))
    }
    const handleFormSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      try{
        if(name===''&& email===''&& password===''){
          console.log('fileds cannot be empty')
          return
        }
        // now we check if the user above already exist in the db
        const checkUserResponse = await axios.get(`${BASE_URL}/users`)
        const allUsers = checkUserResponse.data
        const existingUser = allUsers.find((eachUser:IUser)=>eachUser.email===user.email)
        const storedUsers = localStorage.getItem('users')
        let usersArray = []
        if(storedUsers){
          usersArray = JSON.parse(storedUsers)
          console.log(usersArray)
        }
        if(!existingUser){
          // then add to the database
          //Note: there are still much validation, for instance accepting the email
          // format we want, checking if the name already exist but for now
          // let make sure that the email is unique
          const addUserResponse = await axios.post(`${BASE_URL}/users`,user)

          // add user to localstorage if not already stored
         
          if(!storedUsers){
            usersArray.push(addUserResponse.data)
            localStorage.setItem('users', JSON.stringify(usersArray))
          }
          // then redirect user to the login page
          
          window.location.href = '/login'
        }else{
          if(!usersArray.some((storedUser:IUser)=>storedUser.email===user.email)){
            usersArray.push(existingUser)
            localStorage.setItem('users', JSON.stringify(usersArray))
          }
          console.log('User already exist in the database')
          window.location.href = '/login'
        }
      }catch(e){
        console.log(e)
      }
    }
    
  return (
    <div className="bg-gray-800 flex justify-center items-center h-screen">
      <div className="bg-black p-20 m-2 shadow-md rounded-md">
        <h2 className="text-2xl text-white font-bold mb-4">Signup!</h2>
        <form onSubmit={handleFormSubmit} >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block font-semibold mb-2 text-white"
            >
             Name
            </label>
            <input
              type="text"
              id="name"
              name='name'
              value={name}
              onChange={handleInputChange}
              className="border-gray-300 border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
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
              name='email'
              value={email}
              onChange={handleInputChange}
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
              type={showPassword? 'text':'password'}
              id="password"
              name='password'
              value={password}
              onChange={handleInputChange}
              className="relative border-gray-300 border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
             <img
                src={visibility}
                alt="Show Password"
                className="absolute top-[60%] right-[30%] md:right-[40%] lg:right-[42%] p-2"
                onClick={() =>
                  setShowPassword((prevState: boolean) => !prevState)
                }
              />
          </div>
          <button
            className="bg-[#001529] text-white rounded-md px-4 py-3 w-full mt-6 text-center"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
