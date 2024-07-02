import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from '../../Redux/Slices/AuthSLice';

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });

  function handleInputChange(e) {
    const {name, value} = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value
    });
  }

function resetLoginState() {
  setLoginDetails({
    email: "",
    password:""
  });
}

  async function onSubmit() {
    console.log("calling login", loginDetails);
    if(!loginDetails.email || !loginDetails.password) return;
    const response = await dispatch(login(loginDetails));
    if(response.payload) navigate("/");
    else resetLoginState();
  }

    return (
      <div className="flex justify-center items-center h-[90vh]">
        <div className="card bg-primary text-primary-content w-96">
          <div className="card-body flex items-center">
              <h2 className="card-title text-4xl text-white font-bold">Login</h2>
              <input 
                  onChange={handleInputChange} 
                  name="email" 
                  autoComplete="one-time-code" 
                  type="email" 
                  placeholder="Email..." 
                  value={loginDetails.email}
                  className="input input-bordered w-full max-w-xs text-white" 
              />
              <input 
                  name="password" 
                  onChange={handleInputChange} 
                  autoComplete="one-time-code" 
                  type="password" 
                  placeholder="Password..." 
                  value={loginDetails.password}
                  className="input input-bordered w-full max-w-xs text-white" 
              />
              <div className="card-actions w-full mt-4">
                <button onClick={onSubmit} className="btn btn-warning w-full font-bold text-lg">SUBMIT</button>
              </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Login;