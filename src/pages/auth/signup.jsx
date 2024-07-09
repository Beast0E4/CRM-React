import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { signup } from '../../Redux/Slices/AuthSLice';

function Signup() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [signUpDetails, setSignUpDetails] = useState({
    email: "",
    password:"",
    name: "",
    userType: "",
    userStatus: "",
    clientName: ""
  });

  const [password, setPassword] = useState("");

  function handleInputChange(e) {
    const {name, value} = e.target;
    if(name === 'confirmPassword') setPassword(value);
    else{
      setSignUpDetails({
        ...signUpDetails,
        [name]: value
      });
    }
  }

function resetSignUpState() {
  setSignUpDetails({
    email: "",
    password:"",
    name: "",
    userType: "",
    userStatus: "",
    clientName: ""
  });
}

  async function onSubmit() {
    if(!signUpDetails.email || !signUpDetails.password || !signUpDetails.userStatus || !signUpDetails.userType || !signUpDetails.clientName || !signUpDetails.name) return;
    if(signUpDetails.password != password){
      toast.error('The passwords do not match'); return;
    }
    const response = await dispatch(signup(signUpDetails));
    console.log(response);
    if(response.payload) navigate("/login");
    else resetSignUpState();
  }

  function handleUserType(e) {
    const userTypeSelected = e.target.textContent;
    setSignUpDetails({
      ...signUpDetails,
      userType: userTypeSelected.toLowerCase(),
      userStatus: (userTypeSelected === "Customer" ? "approved" : "suspended")
    });
    const dropdown = document.getElementById('userTypeDropdown');
    dropdown.open = !dropdown.open;
  }

  const handleKeyPress = useCallback((e) => {
    if(e.key === 'Enter') document.getElementById('submitButton').click();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);


    return (
      <div className="flex justify-center items-center h-[90vh]">
        <div className="card bg-[#268bd2] text-primary-content w-96">
          <div className="card-body flex items-center">
              <h2 className="card-title text-4xl text-black font-bold mb-2">Sign Up</h2>
              <input 
                  name="name" 
                  onChange={handleInputChange} 
                  autoComplete="one-time-code" 
                  type="text" 
                  placeholder="Name..." 
                  value={signUpDetails.name}
                  className="input input-bordered w-full max-w-xs text-white" 
              />
              <input 
                  onChange={handleInputChange} 
                  name="email" 
                  autoComplete="one-time-code" 
                  type="email" 
                  placeholder="Email..." 
                  value={signUpDetails.email}
                  className="input input-bordered w-full max-w-xs text-white" 
              />
              <input 
                  name="password" 
                  onChange={handleInputChange} 
                  autoComplete="one-time-code" 
                  type="password" 
                  placeholder="Password..." 
                  value={signUpDetails.password}
                  className="input input-bordered w-full max-w-xs text-white" 
              />
              <input 
                  name="confirmPassword" 
                  onChange={handleInputChange} 
                  autoComplete="one-time-code" 
                  type="password" 
                  value={password}
                  placeholder="Confirm Password..." 
                  className="input input-bordered w-full max-w-xs text-white" 
              />
              <details className="dropdown w-full" id="userTypeDropdown">
                <summary className="btn m-1">{(!signUpDetails.userType) ? "USER TYPE" : signUpDetails.userType.toUpperCase()}</summary>
                <ul onClick={handleUserType} className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a className="text-white">Admin</a></li>
                    <li><a className="text-white">Customer</a></li>
                    <li><a className="text-white">Engineer</a></li>
                </ul>
              </details>
              <input 
                  name="clientName" 
                  onChange={handleInputChange} 
                  autoComplete="one-time-code" 
                  type="text" 
                  placeholder="Client Name..." 
                  value={signUpDetails.clientName}
                  className="input input-bordered w-full max-w-xs text-white" 
              />
              <div className="card-actions w-full mt-4">
                <button onClick={onSubmit} id="submitButton" className="btn btn-warning w-full font-bold text-lg hover:bg-transparent hover:border-1 hover:border-black">SUBMIT</button>
              </div>
              <p>
                Already registered? <Link to="/login" className="underline font-semibold hover:font-bold">Login</Link>
              </p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Signup;