import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Header from "../header";
import Particle from "../styles/Particle";
import '../../App.css'
import { auth, sendPasswordReset } from "../UI/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

function Reset() {

    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (user) navigate("/store");
    }, [user, loading]);
    return(
        <>
            <Header/>
            <div className="bg-image" >
                <Particle/>
                <div className={"center-blur"}>
                    <div>
                        <h3 className={"words-color"}>Reset your password</h3>
                        <form  className={"form-style"} >
                            <p>
                                <label>Email address</label><br/>
                                <input type="text"
                                       placeholder="Enter email..." value={email} onChange={(e)=> setEmail(e.target.value)}
                                       required />
                            </p>
                            <p>
                                <button id="sub_btn" type="button" onClick={() => sendPasswordReset(email)}>Reset password</button>
                            </p>
                        </form >
                        <footer>
                            <p className="words-color">Already have an account? <Link className="words-color" to="/login">Sign in</Link></p>
                        </footer>
                    </div>
                </div>
            </div>


        </>

    );
};

export default Reset;