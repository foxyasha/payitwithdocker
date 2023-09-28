import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/Store.css";
import {auth, sendPasswordReset } from '../UI/firebaseConfig';
import {Spinner} from "react-bootstrap";
import Particle from "../styles/Particle";
import Navigation from "../Navigation";
import "../styles/AddProduct.css"

const Store = () => {
    const [user, loading] = useAuthState(auth);
    const [email, setEmail] = useState("");

    if(loading){
        return <Spinner style={{
            marginLeft: "auto",
            marginRight: "auto",
            justifyContent:"center",
            display:"flex",
            marginTop:"300px"
        }}/>
    }

    return (
        <>
            <Navigation/>
            <div className="bg-settingsimage ">
                <Particle/>
                <div className="settingsform">
                    <form>
                        <h2> Account settings </h2>
                        <h5>Your username: {auth.currentUser.displayName} </h5>
                        <hr/>
                        <h5>Your email address: {user?.email} </h5>
                        <hr/>
                        <p>Want to change your password? </p>
                        <input type="text"
                               placeholder="Enter email..." value={email} onChange={(e) => setEmail(e.target.value)}
                               className="form-control" required/>
                        <hr/>
                        <button className="resetbutton" type="button" onClick={() => sendPasswordReset(email)}  >Reset password</button>
                    </form>
                </div>
            </div>
        </>


    );
}

export default Store;


