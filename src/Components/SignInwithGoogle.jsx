import { doc, setDoc } from "firebase/firestore";
import { auth } from "../Firebase/firebase";
import Googlebtn from "../assets/Image/google.png"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db } from "../Firebase/firebase";
import { toast } from "react-toastify";


const SignInwithGoogle = () => {

  const googleLogin=()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result);
        const user = result.user;
        if (result.user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: user.displayName,
            photo: user.photoURL,
            lastName: "",
          });
          toast.success("User logged in Successfully", {
            position: "top-center",
          });
          window.location.href = "/profile";
        }
      });
      
  }

  return (
    <div>
      <p className="continue-p">--Or continue with--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={Googlebtn} width={"40%"} />
      </div>
    </div>
  );
};

export default SignInwithGoogle;
