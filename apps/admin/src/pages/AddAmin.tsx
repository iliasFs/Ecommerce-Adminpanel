import CustomInput from "../components/CustomInput";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../types/userTypes";

import axios from "axios";

const AddAdmin = () => {

    const navigate = useNavigate()
    const BASE_URL = 'http://localhost:8080'
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
            
            navigate('/admin/all-admins')
          }else{
            if(!usersArray.some((storedUser:IUser)=>storedUser.email===user.email)){
              usersArray.push(existingUser)
              localStorage.setItem('users', JSON.stringify(usersArray))
            }
            console.log('User already exist in the database')
            navigate('/admin/all-admins')
          }
        }catch(e){
          console.log(e)
        }
      }

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold pl-1">Add an Admin</h3>
      <div>
        <form action="" onSubmit={handleFormSubmit}>
          <CustomInput
            name="name"
            type="text"
            label="Enter Admin Name"
            onChng={handleInputChange}
          />
          <CustomInput
            name="email"
            type="email"
            label="Email address"
            onChng={handleInputChange}
          />
           <CustomInput
            name="password"
            type="password"
            label="Enter the password"
            onChng={handleInputChange}
          />
         
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-5 rounded-md shadow-md transition duration-300 ease-in-out mt-10"
          >
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
