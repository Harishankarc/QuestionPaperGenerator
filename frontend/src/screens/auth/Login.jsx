import { useState } from "react";
export default function Login() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function HandleLogin(e){
    e.preventDefault();
    console.log(username,password)
    setUsername("");
    setPassword("");
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-200">
      <div className="flex justify-between gap-10 my-4">
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className={`w-auto justify-center py-2 px-4 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 rounded-md text-white ring-2 cursor-pointer ${isAdmin ? "" : "border-2 border-black bg-black" }`}>Faculty Login</button>
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className={`w-auto justify-center py-2 px-4 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 rounded-md text-white ring-2 cursor-pointer ${isAdmin ? "border-2 border-black bg-black" : "" }`}>Admin Login</button>
      </div>
      <div className="w-80 rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden bg-gray">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h2 className="text-2xl font-medium text-slate-700">{isAdmin ? "Admin " : "Faculty "}Login</h2>
          <p className="text-slate-500">Enter details below.</p>
        </div>
        <form className="w-full mt-4 space-y-3" onSubmit={(e)=>HandleLogin(e)}>
          <div>
            <input
              className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-gray-700"
              placeholder="Username"
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-gray-700"
              placeholder="Password"
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">

            <a className="text-gray-500 font-medium hover:underline" href="#">
              Forgot Password
            </a>
          </div>
          <button
            className="w-full justify-center py-1 bg-gray-500 hover:bg-gray-600 active:bg-gray-700 rounded-md text-white ring-2 cursor-pointer"
            id="login"
            name="login"
            type="submit"
          >
            login
          </button>
          <p className="flex justify-center space-x-1">
            <span className="text-slate-700">Have an account?</span>
            <a className="text-blue-500 hover:underline" href="#">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
