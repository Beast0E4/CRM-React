import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
              <h2 className="card-title text-4xl text-black font-bold mb-2">Login</h2>
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
              <button onClick={onSubmit} id="submitButton" className="btn btn-warning w-full font-bold text-lg hover:bg-transparent hover:border-1 hover:border-black">SUBMIT</button>
              </div>
              <p>
                Not yet registered? <Link to="/signup" className="underline font-semibold hover:font-bold">Sign Up</Link>
              </p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Login;