import { SetStateAction } from "react";

interface CustomInputProps {
  type?: string;
  label?: string;
  i_id?: string;
  i_class?: string;
  name: string;
  val?: string;
  onChange?: (e: { target: { value: SetStateAction<string> } }) => void;
}

const CustomInput = (props: CustomInputProps) => {
  const { type, label, i_id, i_class, name, val, onChange } = props;
  return (
    <div className="form-floating my-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onChange}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
