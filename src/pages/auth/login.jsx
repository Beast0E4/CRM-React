function Login() {

    return (
      <div className="flex justify-center items-center h-[90vh]">
        <div className="card bg-primary text-primary-content w-96">
          <div className="card-body flex items-center">
              <h2 className="card-title text-4xl text-white font-bold">Login</h2>
              <input autoComplete="one-time-code" type="email" placeholder="User Id..." className="input input-bordered w-full max-w-xs text-white" />
              <input autoComplete="one-time-code" type="password" placeholder="Password..." className="input input-bordered w-full max-w-xs text-white" />
              <div className="card-actions w-full mt-4">
                <button className="btn btn-warning w-full font-bold text-lg">SUBMIT</button>
              </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Login