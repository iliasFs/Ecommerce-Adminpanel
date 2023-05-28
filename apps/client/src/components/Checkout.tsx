import { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem, IProduct } from "../types";
import axios from "axios";
import priceFormat from "../utilities/priceFormat";

interface IFormState {
  email?: string;
  country: string;
  name: string;
  lastName: string;
  street: string;
  additional: string;
  postal: string;
  city: string;
  phone: string;
}
type IAction = { type: "UPDATE_INPUT"; id: string; value: string };
const initialState: IFormState = {
  email: "",
  country: "",
  name: "",
  lastName: "",
  street: "",
  additional: "",
  postal: "",
  city: "",
  phone: "",
};

//REDUCER
const reducer = (state: IFormState, action: IAction): IFormState => {
  switch (action.type) {
    case "UPDATE_INPUT":
      return { ...state, [action.id]: action.value };
    default:
      return state;
  }
};

//COMPONENT STARTS HERE
const Checkout = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showSummary, setShowSummary] = useState(false);
  const [priceDiscount, setPriceDiscount] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [discountInput, setDiscountInput] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [cartItems, setCartItems] = useState([]);


  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    getCartItems();
  }, [cartItems]);
  //GET cART ITEMS
  async function getCartItems() {
    const itemsList = localStorage.getItem("shopping-cart");
    const idArr: number[] = [];
    if (itemsList) {
      let totalPrice = 0;
      JSON.parse(itemsList).map((item: CartItem) => {
        if (item.price) {
          totalPrice += item.price * item.quantity;
        }
        return idArr.push(item.id);
      });
      const cartList = await axios.post("http://localhost:8080/allProductsId", {
        idArr: idArr,
      });
      setTotalPrice(totalPrice.toFixed(2).toString());

      setCartItems(cartList.data);
    }
  }
  function getQuantity(id: number) {
    const itemsList = localStorage.getItem("shopping-cart");
    let item: CartItem;
    if (itemsList) {
      item = JSON.parse(itemsList).find((item: CartItem) => item.id === id);
      return item.quantity;
    }
  }
  //HANDLES CHANGE OF FORM INPUTS AND SET THE STATE
  const handleShippingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { id, value } = e.target;
    dispatch({ type: "UPDATE_INPUT", id, value });
  };
  //HANDLES CHANGE OF EMAIL INPUT AND SET THE STATE

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { id, value } = e.target;
    dispatch({ type: "UPDATE_INPUT", id, value });
  }
  //HANDLES PAGE SUBMIT AND RESET ALL INPUTS
  function handleShippingSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    navigate("/payment", {
      state: { ...state, itemsList: cartItems, price: totalPrice },
    });
    
    dispatch({ type: "UPDATE_INPUT", id: "country", value: "" });
    dispatch({ type: "UPDATE_INPUT", id: "name", value: "" });
    dispatch({ type: "UPDATE_INPUT", id: "lastName", value: "" });
    dispatch({ type: "UPDATE_INPUT", id: "street", value: "" });
    dispatch({ type: "UPDATE_INPUT", id: "additional", value: "" });
    dispatch({ type: "UPDATE_INPUT", id: "postal", value: "" });
    dispatch({ type: "UPDATE_INPUT", id: "city", value: "" });
    dispatch({ type: "UPDATE_INPUT", id: "phone", value: "" });
  }

  function handleShowSummary(): void {
    setShowSummary(!showSummary);
  }
  function handleDiscChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setDiscountInput(e.target.value);
  }
  function handleDiscountSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (
      discountInput === "max" ||
      discountInput === "ilias" ||
      discountInput === "agnes"
    ) {
      const discount = (15 / 100) * parseInt(totalPrice);
      const newPrice = parseInt(totalPrice) - discount;
      setDiscount(priceFormat(discount).toString());
      setPriceDiscount(priceFormat(newPrice).toString());
      setDiscountInput("");
      if (inputRef.current && buttonRef.current) {
        inputRef.current.disabled = true;
        buttonRef.current.disabled = true;
      }
    }
  }
  return (
    <div className="flex-wrap w-[350px] sm:w-[600px]  checkout-container">
      <div
        onClick={handleShowSummary}
        className="flex flex-col  md:flex-row mb-4 cursor-pointer p-2 hover:shadow-md  gap-4 mt-[-6px] items-center py-4 border-b-[5px] border-[#1D3557]"
      >
        <div>

          <img
            className="h-[30px] w-[30px]"
            src="/figma/Icon.svg"
            alt=""
          />

        </div>
        {showSummary && <p className="animate-fadeIn">Hide summary</p>}
        {!showSummary && <p className="animate-fadeIn">Show summary</p>}
        {!showSummary ? (
          <svg
            width="11"
            height="6"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000"
          >
            <path d="M.504 1.813l4.358 3.845.496.438.496-.438 4.642-4.096L9.504.438 4.862 4.534h.992L1.496.69.504 1.812z"></path>
          </svg>
        ) : (
          <svg
            width="11"
            height="7"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000"
          >
            <path d="M6.138.876L5.642.438l-.496.438L.504 4.972l.992 1.124L6.138 2l-.496.436 3.862 3.408.992-1.122L6.138.876z"></path>
          </svg>
        )}
      </div>

      <div>
        {showSummary && (
          <div className="animate-fadeIn">
            {cartItems.map((item: IProduct) => {
              return (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 bg-white rounded-lg"
                >
                  <img
                    className="h-20 object-contain rounded-sm"
                    src={item.images[0]}
                    alt={item.name}
                  ></img>
                  <div className="flex flex-col flex-grow relative">
                    <span className="font-bold">{item.name}</span>
                    <span className="text-gray-600">
                      {priceFormat(item.price)}
                    </span>
                    <span className="text-black-100">{item.size}</span>
                    <span className="absolute opacity-75 top-0 right-0 bg-[#1D3557] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                      {getQuantity(item.id)}
                    </span>
                  </div>
                </div>
              );
            })}
            <form className="flex" onSubmit={handleDiscountSubmit}>
              <input
                className="border border-solid w-full m-2 p-[10px] border-#e0e0e0;"
                ref={inputRef}
                value={discountInput}
                onChange={handleDiscChange}
                type="text"
                placeholder="Gift card or discount code"
              />
              <button
                className="px-2 py-1 text-sm text-white font-bold bg-[#1D3557] rounded"
                ref={buttonRef}
                type="submit"
              >
                APPLY
              </button>
            </form>
            <div className="grid m-4 grid-cols-2">
              <div>
                <div className="flex items-center justify-start text-[#1D3557]">
                  <p>Subtotal</p>
                </div>
                {discount && (
                  <div className="flex items-center animate-fadeIn justify-start  text-gray-300">
                    <p>Discount</p>
                  </div>
                )}
                <div className="flex items-center justify-start font-bold text-[#1D3557]">
                  <h1>Total</h1>{" "}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-end  text-[#1D3557]">
                  <p>{totalPrice}</p>
                </div>
                {discount && (
                  <div className="flex items-center justify-end animate-fadeIn text-gray-300">
                    <p>-{discount}</p>
                  </div>
                )}
                <div className="flex items-center justify-end font-bold text-[#1D3557]">
                  <p>{priceDiscount !== "" ? priceDiscount : totalPrice}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 mb-4 border-b-2"></div>
          </div>
        )}
      </div>

      <div className=" check-form">
        <label className="font-bold">Contact Information</label>
        <div className="flex space-x-5 sm:space-x-72 items-center">
          <p className=" text-[#bebebe]">Alredy have an account?</p>
          <button className="hover:underline">Log in</button>
        </div>
      </div>

      <form
        className="flex flex-col w-[300px] sm:w-full items-center justify-center"
        onSubmit={handleShippingSubmit}
      >
        <input
          onChange={handleEmailChange}
          id="email"
          className="border border-solid w-full m-2 p-[10px] border-#e0e0e0;"
          type="email"
          placeholder="email"
          required
        />
        <h2 className="font-bold pt-4">Shipping Adress</h2>

        <select
          className="border border-solid w-full m-2 p-[10px] border-#e0e0e0;"
          value={state.country}
          id="country"
          onChange={handleShippingChange}
          required
        >
          <option className="color-gray-300" value="selected">
            Country/region
          </option>
          <option value="Afghanistan">Afghanistan</option>
          <option value="Åland Islands">Åland Islands</option>
          <option value="Albania">Albania</option>
          <option value="Algeria">Algeria</option>
          <option value="American Samoa">American Samoa</option>
          <option value="Andorra">Andorra</option>
          <option value="Angola">Angola</option>
          <option value="Anguilla">Anguilla</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Antigua and Barbuda">Antigua and Barbuda</option>
          <option value="Argentina">Argentina</option>
          <option value="Armenia">Armenia</option>
          <option value="Aruba">Aruba</option>
          <option value="Australia">Australia</option>
          <option value="Austria">Austria</option>
          <option value="Azerbaijan">Azerbaijan</option>
          <option value="Bahamas">Bahamas</option>
          <option value="Bahrain">Bahrain</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="Barbados">Barbados</option>
          <option value="Belarus">Belarus</option>
          <option value="Belgium">Belgium</option>
          <option value="Belize">Belize</option>
          <option value="Benin">Benin</option>
          <option value="Bermuda">Bermuda</option>
          <option value="Bhutan">Bhutan</option>
          <option value="Bolivia">Bolivia</option>
          <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
          <option value="Botswana">Botswana</option>
          <option value="Bouvet Island">Bouvet Island</option>
          <option value="Brazil">Brazil</option>
          <option value="British Indian Ocean Territory">
            British Indian Ocean Territory
          </option>
          <option value="Brunei Darussalam">Brunei Darussalam</option>
          <option value="Bulgaria">Bulgaria</option>
          <option value="Burkina Faso">Burkina Faso</option>
          <option value="Burundi">Burundi</option>
          <option value="Cambodia">Cambodia</option>
          <option value="Cameroon">Cameroon</option>
          <option value="Canada">Canada</option>
          <option value="Cape Verde">Cape Verde</option>
          <option value="Cayman Islands">Cayman Islands</option>
          <option value="Central African Republic">
            Central African Republic
          </option>
          <option value="Chad">Chad</option>
          <option value="Chile">Chile</option>
          <option value="China">China</option>
          <option value="Christmas Island">Christmas Island</option>
          <option value="Cocos (Keeling) Islands">
            Cocos (Keeling) Islands
          </option>
          <option value="Colombia">Colombia</option>
          <option value="Comoros">Comoros</option>
          <option value="Congo">Congo</option>
          <option value="Congo, The Democratic Republic of The">
            Congo, The Democratic Republic of The
          </option>
          <option value="Cook Islands">Cook Islands</option>
          <option value="Costa Rica">Costa Rica</option>
          <option value="Cote D'ivoire">Cote D'ivoire</option>
          <option value="Croatia">Croatia</option>
          <option value="Cuba">Cuba</option>
          <option value="Cyprus">Cyprus</option>
          <option value="Czech Republic">Czech Republic</option>
          <option value="Denmark">Denmark</option>
          <option value="Djibouti">Djibouti</option>
          <option value="Dominica">Dominica</option>
          <option value="Dominican Republic">Dominican Republic</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Egypt">Egypt</option>
          <option value="El Salvador">El Salvador</option>
          <option value="Equatorial Guinea">Equatorial Guinea</option>
          <option value="Eritrea">Eritrea</option>
          <option value="Estonia">Estonia</option>
          <option value="Ethiopia">Ethiopia</option>
          <option value="Falkland Islands (Malvinas)">
            Falkland Islands (Malvinas)
          </option>
          <option value="Faroe Islands">Faroe Islands</option>
          <option value="Fiji">Fiji</option>
          <option value="Finland">Finland</option>
          <option value="France">France</option>
          <option value="French Guiana">French Guiana</option>
          <option value="French Polynesia">French Polynesia</option>
          <option value="French Southern Territories">
            French Southern Territories
          </option>
          <option value="Gabon">Gabon</option>
          <option value="Gambia">Gambia</option>
          <option value="Georgia">Georgia</option>
          <option value="Germany">Germany</option>
          <option value="Ghana">Ghana</option>
          <option value="Gibraltar">Gibraltar</option>
          <option value="Greece">Greece</option>
          <option value="Greenland">Greenland</option>
          <option value="Grenada">Grenada</option>
          <option value="Guadeloupe">Guadeloupe</option>
          <option value="Guam">Guam</option>
          <option value="Guatemala">Guatemala</option>
          <option value="Guernsey">Guernsey</option>
          <option value="Guinea">Guinea</option>
          <option value="Guinea-bissau">Guinea-bissau</option>
          <option value="Guyana">Guyana</option>
          <option value="Haiti">Haiti</option>
          <option value="Heard Island and Mcdonald Islands">
            Heard Island and Mcdonald Islands
          </option>
          <option value="Holy See (Vatican City State)">
            Holy See (Vatican City State)
          </option>
          <option value="Honduras">Honduras</option>
          <option value="Hong Kong">Hong Kong</option>
          <option value="Hungary">Hungary</option>
          <option value="Iceland">Iceland</option>
          <option value="India">India</option>
          <option value="Indonesia">Indonesia</option>
          <option value="Iran, Islamic Republic of">
            Iran, Islamic Republic of
          </option>
          <option value="Iraq">Iraq</option>
          <option value="Ireland">Ireland</option>
          <option value="Isle of Man">Isle of Man</option>
          <option value="Israel">Israel</option>
          <option value="Italy">Italy</option>
          <option value="Jamaica">Jamaica</option>
          <option value="Japan">Japan</option>
          <option value="Jersey">Jersey</option>
          <option value="Jordan">Jordan</option>
          <option value="Kazakhstan">Kazakhstan</option>
          <option value="Kenya">Kenya</option>
          <option value="Kiribati">Kiribati</option>
          <option value="Korea, Democratic People's Republic of">
            Korea, Democratic People's Republic of
          </option>
          <option value="Korea, Republic of">Korea, Republic of</option>
          <option value="Kuwait">Kuwait</option>
          <option value="Kyrgyzstan">Kyrgyzstan</option>
          <option value="Lao People's Democratic Republic">
            Lao People's Democratic Republic
          </option>
          <option value="Latvia">Latvia</option>
          <option value="Lebanon">Lebanon</option>
          <option value="Lesotho">Lesotho</option>
          <option value="Liberia">Liberia</option>
          <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
          <option value="Liechtenstein">Liechtenstein</option>
          <option value="Lithuania">Lithuania</option>
          <option value="Luxembourg">Luxembourg</option>
          <option value="Macao">Macao</option>
          <option value="Macedonia, The Former Yugoslav Republic of">
            Macedonia, The Former Yugoslav Republic of
          </option>
          <option value="Madagascar">Madagascar</option>
          <option value="Malawi">Malawi</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Maldives">Maldives</option>
          <option value="Mali">Mali</option>
          <option value="Malta">Malta</option>
          <option value="Marshall Islands">Marshall Islands</option>
          <option value="Martinique">Martinique</option>
          <option value="Mauritania">Mauritania</option>
          <option value="Mauritius">Mauritius</option>
          <option value="Mayotte">Mayotte</option>
          <option value="Mexico">Mexico</option>
          <option value="Micronesia, Federated States of">
            Micronesia, Federated States of
          </option>
          <option value="Moldova, Republic of">Moldova, Republic of</option>
          <option value="Monaco">Monaco</option>
          <option value="Mongolia">Mongolia</option>
          <option value="Montenegro">Montenegro</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Morocco">Morocco</option>
          <option value="Mozambique">Mozambique</option>
          <option value="Myanmar">Myanmar</option>
          <option value="Namibia">Namibia</option>
          <option value="Nauru">Nauru</option>
          <option value="Nepal">Nepal</option>
          <option value="Netherlands">Netherlands</option>
          <option value="Netherlands Antilles">Netherlands Antilles</option>
          <option value="New Caledonia">New Caledonia</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Nicaragua">Nicaragua</option>
          <option value="Niger">Niger</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Niue">Niue</option>
          <option value="Norfolk Island">Norfolk Island</option>
          <option value="Northern Mariana Islands">
            Northern Mariana Islands
          </option>
          <option value="Norway">Norway</option>
          <option value="Oman">Oman</option>
          <option value="Pakistan">Pakistan</option>
          <option value="Palau">Palau</option>
          <option value="Palestinian Territory, Occupied">
            Palestinian Territory, Occupied
          </option>
          <option value="Panama">Panama</option>
          <option value="Papua New Guinea">Papua New Guinea</option>
          <option value="Paraguay">Paraguay</option>
          <option value="Peru">Peru</option>
          <option value="Philippines">Philippines</option>
          <option value="Pitcairn">Pitcairn</option>
          <option value="Poland">Poland</option>
          <option value="Portugal">Portugal</option>
          <option value="Puerto Rico">Puerto Rico</option>
          <option value="Qatar">Qatar</option>
          <option value="Reunion">Reunion</option>
          <option value="Romania">Romania</option>
          <option value="Russian Federation">Russian Federation</option>
          <option value="Rwanda">Rwanda</option>
          <option value="Saint Helena">Saint Helena</option>
          <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
          <option value="Saint Lucia">Saint Lucia</option>
          <option value="Saint Pierre and Miquelon">
            Saint Pierre and Miquelon
          </option>
          <option value="Saint Vincent and The Grenadines">
            Saint Vincent and The Grenadines
          </option>
          <option value="Samoa">Samoa</option>
          <option value="San Marino">San Marino</option>
          <option value="Sao Tome and Principe">Sao Tome and Principe</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="Senegal">Senegal</option>
          <option value="Serbia">Serbia</option>
          <option value="Seychelles">Seychelles</option>
          <option value="Sierra Leone">Sierra Leone</option>
          <option value="Singapore">Singapore</option>
          <option value="Slovakia">Slovakia</option>
          <option value="Slovenia">Slovenia</option>
          <option value="Solomon Islands">Solomon Islands</option>
          <option value="Somalia">Somalia</option>
          <option value="South Africa">South Africa</option>
          <option value="South Georgia and The South Sandwich Islands">
            South Georgia and The South Sandwich Islands
          </option>
          <option value="Spain">Spain</option>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="Sudan">Sudan</option>
          <option value="Suriname">Suriname</option>
          <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
          <option value="Swaziland">Swaziland</option>
          <option value="Sweden">Sweden</option>
          <option value="Switzerland">Switzerland</option>
          <option value="Syrian Arab Republic">Syrian Arab Republic</option>
          <option value="Taiwan">Taiwan</option>
          <option value="Tajikistan">Tajikistan</option>
          <option value="Tanzania, United Republic of">
            Tanzania, United Republic of
          </option>
          <option value="Thailand">Thailand</option>
          <option value="Timor-leste">Timor-leste</option>
          <option value="Togo">Togo</option>
          <option value="Tokelau">Tokelau</option>
          <option value="Tonga">Tonga</option>
          <option value="Trinidad and Tobago">Trinidad and Tobago</option>
          <option value="Tunisia">Tunisia</option>
          <option value="Turkey">Turkey</option>
          <option value="Turkmenistan">Turkmenistan</option>
          <option value="Turks and Caicos Islands">
            Turks and Caicos Islands
          </option>
          <option value="Tuvalu">Tuvalu</option>
          <option value="Uganda">Uganda</option>
          <option value="Ukraine">Ukraine</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States">United States</option>
          <option value="United States Minor Outlying Islands">
            United States Minor Outlying Islands
          </option>
          <option value="Uruguay">Uruguay</option>
          <option value="Uzbekistan">Uzbekistan</option>
          <option value="Vanuatu">Vanuatu</option>
          <option value="Venezuela">Venezuela</option>
          <option value="Viet Nam">Viet Nam</option>
          <option value="Virgin Islands, British">
            Virgin Islands, British
          </option>
          <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
          <option value="Wallis and Futuna">Wallis and Futuna</option>
          <option value="Western Sahara">Western Sahara</option>
          <option value="Yemen">Yemen</option>
          <option value="Zambia">Zambia</option>
          <option value="Zimbabwe">Zimbabwe</option>
        </select>

        <div className="flex  ">
          <input
            className="border border-solid w-full m-2 p-[10px] border-#e0e0e0;"
            value={state.name}
            id="name"
            onChange={handleShippingChange}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            className="border border-solid w-full m-2 p-[10px] border-#e0e0e0;"
            value={state.lastName}
            id="lastName"
            onChange={handleShippingChange}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          className="border border-solid w-full m-2 p-[10px] border-#e0e0e0;"
          value={state.street}
          id="street"
          onChange={handleShippingChange}
          type="text"
          placeholder="Street and house number"
          required
        />
        <input
          className="border border-solid w-full m-2 p-[10px] border-#e0e0e0;"
          value={state.additional}
          onChange={handleShippingChange}
          id="additional"
          type="text"
          placeholder="Additional address (optional)"
        />
        <div className="flex">
          <input
            className="border border-solid w-full m-2 p-[10px] border-#e0e0e0;"
            value={state.postal}
            onChange={handleShippingChange}
            id="postal"
            type="text"
            pattern="[0-9]{5}"
            placeholder="Postal code"
            required
          />
          <input
            className="border border-solid w-full m-2 p-[10px] border-#e0e0e0;"
            value={state.city}
            onChange={handleShippingChange}
            id="city"
            type="text"
            placeholder="City"
            required
          />
        </div>
        <div className="flex">
          <input
            className="border  border-solid w-full m-2 p-[10px] border-#e0e0e0;"
            value={state.phone}
            onChange={handleShippingChange}
            id="phone"
            type="tel"
            pattern="[0-9]{9}"
            placeholder="Phone"
            required
          ></input>
          <p className="w-[225px] h-2 phone-input">
            {"?"}
            <span className=" message">
              In case we need to contact you about your order
            </span>
          </p>
        </div>

        <button
          type="submit"
          className="border w-full m-2 p-[10px] border-#e0e0e0 rounded-[6px] hover:shadow-md bg-black text-white"
        >
          CONTINUE TO SHIPPING
        </button>
      </form>
    </div>
  );
};

export default Checkout;
