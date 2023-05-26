import CustomInput from "../components/CustomInput";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IUser } from "../types/userTypes";

const EditAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const BASE_URL = "http://localhost:8080";
  
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    password: "",
    isAdmin: true,
  });

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUserState) => ({
      ...prevUserState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (user.name === "" || user.email === "" || user.password === "") {
        console.log("Fields cannot be empty");
        return;
      }

      await axios.put(`${BASE_URL}/users/${id}`, user);
      console.log("User updated successfully");
      navigate("/admin/all-admins");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold pl-1">Edit Admin</h3>
      <div>
        <form action="" onSubmit={handleFormSubmit}>
          <CustomInput
            name="name"
            type="text"
            label="Enter Admin Name"
            val={user.name}
            onChng={handleInputChange}
          />
          <CustomInput
            name="email"
            type="email"
            label="Email address"
            val={user.email}
            onChng={handleInputChange}
          />
          <CustomInput
            name="password"
            type="password"
            label="Enter the password"
            val={user.password}
            onChng={handleInputChange}
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-5 rounded-md shadow-md transition duration-300 ease-in-out mt-10"
          >
            Update Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAdmin;
