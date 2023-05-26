import { ChangeEvent } from "react";

type PriceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;
type StockChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;
type NameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void;
type isNewArrival = (e: ChangeEvent<HTMLInputElement>) => void;
type isFeatured = (e: ChangeEvent<HTMLInputElement>) => void;

interface CustomInputProps {
  type?: string;
  label?: string;
  i_id?: string;
  i_class?: string;
  name: string;
  val?: string | number;
  onChng?:
    | PriceChangeHandler
    | StockChangeHandler
    | NameChangeHandler
    | isNewArrival
    | isFeatured;
  onBlr?: any;
}

const CustomInput = (props: CustomInputProps) => {
  const { type, label, i_id, i_class, name, val, onChng, onBlr } = props;
  return (
    <div className="form-floating my-3">
      <input
        type={type}
        className={`form-control ${i_class}`}
        id={i_id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onChng} // Corrected the prop name to 'onChange'
        onBlur={onBlr}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CustomInput;
