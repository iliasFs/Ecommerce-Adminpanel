import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

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
const AddBlog = () => {
  const [headInput, setHeadInput] = useState<string>("Whatever");
  const [desc, setDesc] = useState<string>("");
  const handleDescChange = (value: string) => {
    setDesc(value);
  };

  useEffect(() => {
    console.log(headInput);
    console.log(desc);
  }, [headInput, desc]);

  

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold pl-1">Add Blog</h3>

      <div className="">
        <form action="">
          <CustomInput
            type="text"
            label="Enter Blog Title"
            i_id=""
            i_class=""
            name=""
            val={headInput}
            onChange={(e) => setHeadInput(e.target.value)}
          />
          <select className="form-control py-3 mb-3" name="" id="">
            <option value="">Select Blog Category</option>
            <option value="Materials">Materials</option>
            <option value="Green Policies">Green Policies</option>
            <option value="Fashion">Fashion</option>
          </select>
          <div className="mb-4">
            <ReactQuill theme="snow" value={desc} onChange={handleDescChange} />
          </div>
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Dragger>
          <button className="btn btn-success border-0 rounded-3 my-5">
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
