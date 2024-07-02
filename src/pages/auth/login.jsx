import { useState } from "react";
import { useDispatch } from "react-redux";

import { login } from '../../Redux/Slices/AuthSLice';

function Login() {

  const dispatch = useDispatch();

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });

  function handleInputChange(e) {
    const {name, value} = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value
    })
  }

  async function onSubmit() {
    console.log("calling login", loginDetails);
    if(!loginDetails.email || !loginDetails.password) return;
    const response = await dispatch(login(loginDetails));
    console.log(`Respons: ${response}`);
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
                  className="input input-bordered w-full max-w-xs text-white" 
              />
              <input 
                  name="password" 
                  onChange={handleInputChange} 
                  autoComplete="one-time-code" 
                  type="password" 
                  placeholder="Password..." 
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