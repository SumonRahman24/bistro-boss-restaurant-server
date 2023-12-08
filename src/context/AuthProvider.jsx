import { createContext, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import auth from "./../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // SignUp
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update UserProfile
  const updateUserProfile = (userInfo, profile) => {
    return updateProfile(userInfo, profile);
  };

  // signIn
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // signInWithGoogle
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // signInWithGithub
  const signInWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };

  // signInWithFacebook
  const signInWithFacebook = () => {
    return signInWithPopup(auth, facebookProvider);
  };

  // signOut
  const signout = (email, password) => {
    return signOut(auth, email, password);
  };

  // onAuthStateChanged
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      setUser(currentUser);

      // getEmail
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };

      // jwtAuth
      if (currentUser) {
        axios
          .post(`http://localhost:5000/jwt`, loggedUser, {
            withCredentials: true,
          })
          .then((res) => console.log("jwt data", res.data));
      } else {
        axios
          .post(`http://localhost:5000/logout`, loggedUser, {
            withCredentials: true,
          })
          .then((res) => console.log("jwt cookie clean data", res.data));
      }

      if (user) {
        setLoading(false);
      }

      return () => {
        return unSubscribe();
      };
    });
  }, [user]);

  const authInfo = {
    signUp,
    updateUserProfile,
    signIn,
    signInWithFacebook,
    signInWithGoogle,
    signInWithGithub,
    signout,
    loading,
    user,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
