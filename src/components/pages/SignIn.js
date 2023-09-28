import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Header from "../header";
import Particle from "../styles/Particle";
import '../../App.css'
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../UI/firebaseConfig';
import {useAuthState} from "react-firebase-hooks/auth";
import Toastify from "toastify-js";
import "../ValidData"
import ValidData from "../ValidData";

const SignIn = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [user, loading] = useAuthState(auth);
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/store");
    }, [user, loading]);

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                ValidData('You are successfully signed in!', true)

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if(!user || errorCode == 'auth/invalid-email'){
                    ValidData('Incorrect email or password!', false)
                }

                function SignIn(){
                    const [user] = useAuthState(auth);
                    useEffect(() => {
                        if (user) navigate("/store");
                    }, [user]);
                };

            });

    }



    return(
        <>
            <Header/>
            <div className="bg-image" >
                <Particle/>
                <div className={"center-blur"}>
                    <div>
                        <h3 className={"words-color"}>Login into your account</h3>
                        <form  className={"form-style"} >
                            <p>
                                <label>Email address</label><br/>
                                <input type="text"
                                 placeholder="Enter email..." onChange={(e)=> setEmail(e.target.value)}
                                       required />
                            </p>
                            <p >
                                <label>Password</label>
                                <br/>
                                <input type="password" placeholder="Enter password..." onChange={(e)=> setPassword(e.target.value)}
                                       required />
                            </p>
                            <p>
                                <button id="sub_btn" onClick={onLogin}>Login</button>
                            </p>
                        </form >
                        <footer>
                            <p className="words-color">Forgot your password? <Link to="/reset" className="words-color">Reset Password</Link></p>
                            <p className="words-color">First time? <Link to="/reg" className="words-color">Create an account</Link></p>
                        </footer>
                    </div>
                </div>
            </div>


        </>

    );
};

export default SignIn;

