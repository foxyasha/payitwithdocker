import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Header from "../header";
import Particle from "../styles/Particle";
import '../../App.css'
import {  createUserWithEmailAndPassword, updateProfile  } from 'firebase/auth';
import { auth } from '../UI/firebaseConfig';
import {useAuthState} from "react-firebase-hooks/auth";
import ValidData from "../ValidData";
import button from "bootstrap/js/src/button";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/store");
  }, [user, loading]);

  const onSubmit = async (e) => {
    e.preventDefault()

    const username = document.getElementById('username').value
    if (username === "")
      return ValidData('Invalid username!', false)

    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {displayName:`${username}`});
          ValidData('You are successfully signed up!', true);
          navigate("/login")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log(errorCode)
          console.log(errorMessage)

          if(errorCode == 'auth/invalid-email')
            return ValidData('Invalid email!', false);

          if(errorCode == 'auth/internal-error')
            return ValidData('Fill all fields correctly!', false);

          if(errorCode == 'auth/missing-email')
            return ValidData('Fill email field!', false);

          if(errorCode == 'auth/weak-password')
            return ValidData('Password should be at least 6 characters!', false);

          if(errorCode == 'auth/email-already-in-use')
            return ValidData('This email already exists!', false);
        });
  }

  return(
  <>
    <Header/>
    <div className="bg-image" >
      <Particle/>
      <div className={"center-blur"}>
        <div>
          <h3 className={"words-color"}>Create your account</h3>
          <form className={"form-style"} >
            <p>
              <label>Username</label><br/>
              <input id="username" type="text" placeholder="Enter username..." onChange={(event)=> setUsername(event.target.value)} required />
            </p>
            <p>
              <label>Email address</label><br/>
              <input type="email" placeholder="Enter email address..." value={email} onChange={(e)=> setEmail(e.target.value)} required />
            </p>
            <p>
              <label>Password</label><br/>
              <input type="password" placeholder="Enter password..." value={password} onChange={(e)=> setPassword(e.target.value)} required />
            </p>
            <p>
              <button id="sub_btn" onClick={onSubmit}>Register</button>
            </p>
          </form>
          <footer>
            <p className="words-color">Already have an account? <Link className="words-color" to="/login">Sign in</Link></p>
            <p><Link className="words-color" to="/">Back to Homepage</Link></p>
          </footer>
        </div>
      </div>
    </div>
  </>
  );
};


export default SignUp;
