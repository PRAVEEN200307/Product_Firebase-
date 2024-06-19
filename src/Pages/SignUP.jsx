import { Link } from "react-router-dom";
import "../index.css";
import {  toast } from 'react-toastify';
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

function SignUP() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);

        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: fname,
            lastName: lname,
            photo: "",
          });
        }
        console.log("User Registered Successfully!!");
        toast.success("User Registered Successfully!!", {
          position: "top-center",
        });
        
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
      <form className="p-10 w-6/12  shadow-lg" onSubmit={handleRegister}>
        <h3 className="text-5xl mb-3">Sign Up</h3>

        <div className="mb-3">
          <label className="text-xl">First name</label>
          <input
            type="text"
            className="block py-3 rounded px-4 w-full bg-slate-200"
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>

        <div className="my-6">
          <label className="text-xl">Last name</label>
          <input
            type="text"
            className="block py-3 rounded px-4 w-full bg-slate-200"
            placeholder="Last name"
            onChange={(e) => setLname(e.target.value)}
          />
        </div>

        <div className="my-6">
          <label className="text-xl">Email address</label>
          <input
            type="email"
            className="block py-3 rounded px-4 w-full bg-slate-200"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="my-6">
          <label className="text-xl"> Password</label>
          <input
            type="password"
            className="block py-3 rounded px-4 w-full bg-slate-200"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className=" bg-blue-500 w-full py-2 text-white">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUP;
