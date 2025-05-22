import { useState } from "react";
export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  function HandleLogin(e){
    e.preventDefault();
    if(password === confirmPassword){
      console.log(name,username,password)
    }else{
      alert("Passwords do not match")
    }
    setName("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-200">

      <div className="w-80 rounded-lg shadow h-auto p-6 bg-white relative overflow-hidden bg-gray">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h2 className="text-2xl font-medium text-slate-700">SignUp</h2>
          <p className="text-slate-500">Enter details below.</p>
        </div>
        <form className="w-full mt-4 space-y-3" onSubmit={(e)=>HandleLogin(e)}>
        <div>
            <input
              className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-gray-700"
              placeholder="Name"
              id="Name"
              name="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div>
            <input
              className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-gray-700"
              placeholder="confirmPassword"
              id="confirmPassword"
              name="confirmPassword"
              type="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
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
            <span className="text-slate-700">Dont't have an account?</span>
            <a className="text-blue-500 hover:underline" href="#">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
