import { useEffect, useState } from "react";
import {  onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../Firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsub = onSnapshot(doc(db, "Users", user.uid), (doc) => {
          // console.log("Current data: ", doc.data());
          setUserDetails(doc.data());
        });
      }
    });
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "./login";
      console.log("User Logged Out Successfully|");
    } catch (err) {
      console.err("Error loggi out:", err.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="p-10 w-8/12 shadow-lg">
        {userDetails ? (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={userDetails.photo}
                width={"40%"}
                style={{ borderRadius: "50%" }}
              />
            </div>
            <h3>Welcome {userDetails.firstName} 🙏🙏</h3>
            <div>
              <p>Email: {userDetails.email}</p>
              <p>First Name: {userDetails.firstName}</p>
              {/* <p>Last Name: {userDetails.lastName}</p> */}
            </div>
            <button
              className=" bg-orange-500 px-3 py-2 mt-2 rounded text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
