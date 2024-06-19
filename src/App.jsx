import Login from "./Pages/Login";
import SignUP from "./Pages/SignUP";
import Profile from "./Pages/Profile";
import './App.css'
import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import AddProductPage from "./Pages/AddProductPage";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { auth } from "./Firebase/firebase";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";



function App() {

  const [user,setUser] =useState(null)

  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  })

  return (
    <>
      
      <Routes>

        <Route  path="/" element={<Navbar />} >
          <Route path="/" element={<HomePage />} />
          <Route path="/AddProduct" element={<AddProductPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUP />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

      {/* <Route
          path="/"
          element={user ? <Navigate to="/profile" /> : <Login />}
        />  */}
      
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
