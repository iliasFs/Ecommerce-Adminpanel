import { useLocation } from "react-router-dom";

const Payment = () => {
  let { state } = useLocation();
  console.log(state);
  return <div>HOLA PEPE</div>;
};

export default Payment;
