import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";
import facebookIcon from "../assets/svg/facebook.svg";
import githubIcon from "../assets/svg/github.svg";
import {FiGithub} from 'react-icons/fi'



function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check for user //
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      // If user doesnt exist, create the user //
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Oops! Could not authorize with Google. Please try again.");
    }
  };

  const onFacebookClick = async () => {
    try {
      const auth = getAuth();
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check for user //
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      // If user doesnt exist, create the user //
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
        console.log(error);
      toast.error("Oops! Could not authorize with Facebook. Please try again.");
    }
  };

  const onGithubClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check for user //
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      // If user doesnt exist, create the user //
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
        console.log(error);
      toast.error("Oops! Could not authorize with Facebook. Please try again.");
    }
  };
  return (
    <>
      <p className="socialLoginText">
        Sign {location.pathname === "/sign-up" ? "up" : "in"} with{" "}
      </p>
      <div className="socialLogin">
        <button className="socialIconDiv" onClick={onGoogleClick}>
          <img src={googleIcon} alt="Google" className="socialIconImg" />
        </button>
        <button className="socialIconDiv" onClick={onFacebookClick}>
          <img src={facebookIcon} alt="Facebook" className="socialIconImg" />
        </button>
        <button className="socialIconDiv" onClick={onGithubClick}>
          <FiGithub size='24px' />
        </button>
      </div>
    </>
  );
}

export default OAuth;
