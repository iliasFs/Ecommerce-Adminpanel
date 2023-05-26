import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Checkbox } from "antd";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhotoUploadForm from "../components/PhotoUploadForm";
import axios from "axios";

const AddProduct = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    price: Yup.number().required("Product price is required"),
    size: Yup.number().required("Product size is required"),
    images: Yup.number().required("Product images are required"),
    description: Yup.number().required("Product description is required"),
    stockQuanity: Yup.number().required("Product stock quantity is required"),
    featured: Yup.number().required(
      "Define if its gonna be a featured product"
    ),
    newArrivals: Yup.number().required(
      "Define if its gonna be a newArrival product"
    ),
    category: Yup.number().required("Product category is required"),
  });

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/product",
        values
      );
      alert("Product has been added");
    } catch (error) {
      console.log("Failed to proceed", error);
    }
  };

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold pl-1">Add Product</h3>
      <div>
        <Formik
          initialValues={{
            name: "",
            price: 0,
            size: 0,
            images: [],
            description: "",
            stockQuantity: 0,
            featured: false,
            newArrivals: false,
            category: "",
            // Initialize other fields
          }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          <Form>
            <CustomInput name="name" type="text" label="Enter Product Name" />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500"
            />

            <CustomInput
              name="price"
              type="number"
              label="Enter Product Price"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-500"
            />
            <select
              className="form-control py-3 mb-3 text-[15px]"
              onChange={handleSizeChange}
            >
              <option value="">Select Size</option>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
            <div className=" text-xl font-bold pl-1">
              <h3>Upload Photos</h3>
            </div>
            <PhotoUploadForm setProductImages={setProductImages} />
            <div className="my-4">
              <ReactQuill
                theme="snow"
                value={desc}
                onChange={handleDescChange}
              />
            </div>
            <CustomInput
              name="stockQuantity"
              type="number"
              label="Enter Stock Quantity"
            />
            <div>
              <Checkbox className="pb-4 flex items-center text-2xl font-bold my-2">
                Featured
              </Checkbox>
            </div>
            <div>
              <Checkbox
                className="pb-4 flex items-center text-2xl font-bold my-2"
                onChange={onChangeNewArrival}
              >
                New Arrival
              </Checkbox>
            </div>
            <select
              className="form-control py-3 mb-3"
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>

            {/* Add Field components and error messages for other fields */}

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-5 rounded-md shadow-md transition duration-300 ease-in-out mt-10"
            >
              Add Product
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddProduct;
