import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ChangeEvent, SetStateAction, useState } from "react";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import PhotoUploadForm from "../components/PhotoUploadForm";
import axios from "axios";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SuccessModal from "../components/SuccessModal";

const HandleProduct = () => {
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
  type StockChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:8080/product/${id}`).then((response) => {
      const { data } = response;
      setProductName(data.name);
      setPrice(data.price);
      setStock(data.stockQuantity);
      setSize(data.size);
      setProductImages(data.images);
      setDesc(data.description);
      setIsFeatured(data.featured);
      setNewArrival(data.newArrivals);
      setSelectedCategory(data.category);
    });
  }, []);

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
  };
  const handleProductPrice: PriceChangeHandler = (e) => {
    setPrice(parseInt(e.target.value));
  };

  const handleStock: StockChangeHandler = (e) => {
    setStock(parseInt(e.target.value));
  };
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);

  };
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSize(selectedValue);
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
      await axios.put(`http://localhost:8080/product/${id}`, data);
      setShowModal(true);
    } catch (error) {
      console.log("failed to proceed", error);
    }
  };
  function handleCloseModal() {
    setShowModal(false);
    navigate("/admin");
  }

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold pl-1">Edit or Delete Product</h3>
      <div>
        <form action="" onSubmit={handleFormSubmit}>
          <CustomInput
            name=""
            val={productName}
            type="text"
            label="Enter Product Name"
            onChng={handleNameChange}
          />
          <CustomInput
            name=""
            val={price}
            type="number"
            label="Enter Product Price"
            onChng={handleProductPrice}
          />
          <select
            className="form-control py-3 mb-3 text-[15px]"
            value={size}
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
          <PhotoUploadForm
            setProductImages={setProductImages}
            productImages={productImages}
          />
          <div className="my-4">
            <ReactQuill theme="snow" value={desc} onChange={handleDescChange} />
          </div>
          <CustomInput
            name=""
            val={stock}
            type="number"
            label="Enter Stock Quantity"
            onChng={handleStock}
          />
          <div>
            <Checkbox
              className="pb-4 flex items-center text-2xl font-bold my-2"
              onChange={onChangeFeatured}
              checked={isFeatured}
            >
              Featured
            </Checkbox>
          </div>
          <div>
            <Checkbox
              className="pb-4 flex items-center text-2xl font-bold my-2"
              onChange={onChangeNewArrival}
              checked={newArrival}
            >
              New Arrival
            </Checkbox>
          </div>
          <select
            className="form-control py-3 mb-3"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">Select Category</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
          <div className="flex gap-5 mt-10">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-5 rounded-md shadow-md transition duration-300 ease-in-out">
              Save Changes
            </button>
            {showModal && (
              <SuccessModal onClose={handleCloseModal} name={"updated"} />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default HandleProduct;
