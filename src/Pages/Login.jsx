import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { useState } from "react";
import {  toast } from 'react-toastify';
import SignInwithGoogle from "../Components/SignInwithGoogle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        document.location.href = "./profile";
        console.log("login Successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(error.message, {
          position: "bottom-center",
        });
      });
  };

  return (
    <div
      className="flex justify-center items-center 
    w-full h-full"
    >
      <form className="p-10 w-6/12  shadow-lg" onSubmit={handleSubmit}>
        <h3 className="text-5xl">Login</h3>

        <div className="my-3">
          <label className="text-xl">Email address</label>
          <input
            type="email"
            placeholder="Enter email"
            className="block py-3 rounded px-4 w-full bg-slate-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-3">
          <label className="text-xl">Password</label>
          <input
            type="password"
            className="block py-3 rounded px-4 w-full bg-slate-200"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="w-full bg-blue-500 py-3 text-white ">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          New user <Link to="/register">Register Here</Link>
        </p>
        <SignInwithGoogle />
      </form>
    </div>
  );
}

export default Login;
