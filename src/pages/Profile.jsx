import { getAuth, updateProfile } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  const auth = getAuth();

  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;

  const navigate = useNavigate();

  const logout = () => {
    auth.signOut();
    navigate("/sign-in");
  };

  const onSubmit = async() => {
    try {
        if(auth.currentUser.displayName !== name) {
            // Update display name in firebase // 
            await updateProfile(auth.currentUser, {
                displayName: name,
            })

            // Update in firestore //
            const userRef = doc(db, 'users', auth.currentUser.uid)
            await updateDoc(userRef, {
                name,
            })
            toast.success('Your profile has been updated!')
            console.log(auth.currentUser);
        }
    } catch (error) {
        toast.error('Oops! Could not update profile details!')
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));

  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">Welcome Back!</p>
        <button type="button" className="logOut" onClick={logout}>
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="personalDetailsText">My Information</p>
          <button
            className="changeBtn"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "Save" : "Edit"}
          </button>
        </div>

        <div className="profileCard">
          <form>
            <p>Name:
            <input
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            </p>

            <hr />
            <p>Email:
            <input
              type="email"
              id="email"
              className="profileEmail"
              disabled={true}
              value={email}
              onChange={onChange}
            />
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
