function Signup() {
    return (
        <div className="flex justify-center items-center h-[90vh]">
        <div className="card bg-primary text-primary-content w-96">
          <div className="card-body flex items-center">
              <h2 className="card-title text-4xl text-white font-bold">Sign Up</h2>
              <input autoComplete="one-time-code" type="text" placeholder="Username..." className="input input-bordered w-full max-w-xs text-white" />
              <input autoComplete="one-time-code" type="email" placeholder="Email Id..." className="input input-bordered w-full max-w-xs text-white" />
              <input autoComplete="one-time-code" type="password" placeholder="Password..." className="input input-bordered w-full max-w-xs text-white" />
              <input autoComplete="one-time-code" type="password" placeholder="Confirm Password..." className="input input-bordered w-full max-w-xs text-white" />
              <details className="dropdown w-full">
                <summary className="btn m-1">USER TYPE</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                    <li><a className="text-white">Customer</a></li>
                    <li><a className="text-white">Enginner</a></li>
                </ul>
            </details>
              <div className="card-actions w-full mt-4">
                <button className="btn btn-warning w-full font-bold text-lg">SUBMIT</button>
              </div>
          </div>
        </div>
      </div>
    )
}

export default Signup