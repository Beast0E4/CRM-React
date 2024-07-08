import HomeLayout from "../../layouts/homelayout";

function CreateTicket() {
    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <form className="min-w-[40rem] text-center border p-20 flex-col border-blue-400 rounded-lg">
                    <h1 className="font-semibold text-3xl text-white flex justify-center">
                        Create New Ticket
                    </h1>
                    <label className="form-control w-full my-4">
                        <div className="label">
                            <span className="label-text text-white text-lg">Give the title of your issue: </span>
                        </div>
                        <input type="text" placeholder="Type here" className="input input-bordered w-full bg-white text-black" />
                    </label>
                    <label className="form-control w-full my-4">
                        <div className="label">
                            <span className="label-text text-white text-lg">Please describe your issue: </span>
                        </div>
                        <textarea placeholder="Type here" className=" w-full bg-white text-black resize-none p-3 rounded-md" rows="5" />
                    </label>
                    <button className="w-full bg-blue-400 text-black font-bold my-4 p-3 rounded-lg hover:scale-105 transition-all ease-in-out">SUBMIT</button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default CreateTicket;