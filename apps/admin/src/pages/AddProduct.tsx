import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import type { UploadProps } from "antd";
import { message } from "antd";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import PhotoUploadForm from "../components/PhotoUploadForm";

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const AddProduct = () => {
  const [desc, setDesc] = useState<string>("");

  const handleDescChange = (value: string) => {
    setDesc(value);
  };

  const onChangeFeatured = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const onChangeNewArrival = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div>
      <h3 className="mb-4 text-xl font-bold pl-1">Add Product</h3>
      <div>
        <form action="">
          <CustomInput name="" type="text" label="Enter Product Name" />

          <CustomInput name="" type="number" label="Enter Product Price" />
          <CustomInput name="" type="text" label="Enter Product Size" />
          <div className=" text-xl font-bold pl-1">
            <h3>Upload Photos</h3>
          </div>
          <PhotoUploadForm />
          <div className="my-4">
            <ReactQuill theme="snow" value={desc} onChange={handleDescChange} />
          </div>
          <CustomInput name="" type="number" label="Enter Stock Quantity" />
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
          <select className="form-control py-3 mb-3" name="" id="">
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
          <button className="btn btn-success border-0 rounded-3 my-5">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
