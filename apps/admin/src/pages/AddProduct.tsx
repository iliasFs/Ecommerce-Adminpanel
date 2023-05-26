import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ChangeEvent, SetStateAction, useState } from "react";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import PhotoUploadForm from "../components/PhotoUploadForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";

const AddProduct = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [desc, setDesc] = useState<string>("");
  const [stock, setStock] = useState<number>(0);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [newArrival, setNewArrival] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  type PriceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;

  const navigate = useNavigate();
  const handleDescChange = (value: string) => {
    setDesc(value);
  };

  const onChangeNewArrival = (e: CheckboxChangeEvent) => {
    setNewArrival(e.target.checked);
  };
  const onChangeFeatured = (e: CheckboxChangeEvent) => {
    setIsFeatured(e.target.checked);
  };
  const handleNameChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setProductName(e.target.value);
    console.log(productName);
  };
  const handleProductPrice: PriceChangeHandler = (e) => {
    setPrice(parseInt(e.target.value));
  };

  const handleStock: PriceChangeHandler = (e) => {
    setStock(parseInt(e.target.value));
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    console.log(selectedValue);
  };
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSize(selectedValue);
    console.log(selectedValue);
  };
  const data = {
    name: productName,
    price: price,
    size: size,
    images: productImages, // Replace with the actual image URLs or file names
    description: desc,
    stockQuantity: stock,
    featured: isFeatured,
    newArrivals: newArrival,
    category: selectedCategory,
  };
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/product", data);
      setShowModal(true);
    } catch (error) {
      console.log("failed to proceed", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/admin");
  };

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold pl-1">Add Product</h3>
      <div>
        <form action="" onSubmit={handleFormSubmit}>
          <CustomInput
            name=""
            type="text"
            label="Enter Product Name"
            onChng={handleNameChange}
          />
          <CustomInput
            name=""
            type="number"
            label="Enter Product Price"
            onChng={handleProductPrice}
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
            <ReactQuill theme="snow" value={desc} onChange={handleDescChange} />
          </div>
          <CustomInput
            name=""
            type="number"
            label="Enter Stock Quantity"
            onChng={handleStock}
          />
          <div>
            <Checkbox
              className="pb-4 flex items-center text-2xl font-bold my-2"
              onChange={onChangeFeatured}
            >
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-5 rounded-md shadow-md transition duration-300 ease-in-out mt-10"
          >
            Add Product
          </button>
          {showModal && (
            <SuccessModal onClose={handleCloseModal} name={"added"} />
          )}
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
