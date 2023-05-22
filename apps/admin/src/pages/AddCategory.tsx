import CustomInput from "../components/CustomInput";

const AddCategory = () => {
  return (
    <div>
      <h3 className="mb-4 text-xl font-bold pl-1">Add Category</h3>
      <div>
        <form action="">
          <CustomInput name="" type="text" label="Enter Category" />
          <button className="btn btn-success border-0 rounded-3 my-5">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
