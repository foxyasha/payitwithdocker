import React, {Component, useEffect, useState} from 'react';
import "./styles/ModalStyle.css"
import {Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, db} from "./UI/firebaseConfig";
import {addDoc, collection, serverTimestamp, setDoc, doc} from "firebase/firestore";
import ValidData from "./ValidData";


const Modal =({open,close, title, img, price, description, useremail, userUid, handleDelete, username, id}) => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [count, setCount] = useState(1)
    const buyeruid = user.uid;
    if (!open) return null;
    function increment(){
        setCount(count + 1)
    }
    function decrement(){
        if(count > 1){
            setCount(count - 1)
        }
    }


    const submitCart = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, "carts"), {
            title,
            description,
            price,
            id,
            username,
            img,
            userUid,
            buyeruid,
            count,
            timestamp: serverTimestamp()
        })
        ValidData('Your product successfully added!', true)
    }

        return (
            <div className='overlay modalBack'>
                <div className='modalContainer'>
                    <Image src={img} width="350px" className='image' height="350px"/>
                    <div className='modalRight '>
                        <button className='closeBtn counterButton' onClick={close}>
                            <span className='bold'>X</span>
                        </button>
                        <div className='content'>
                            <p><span className='bold'>Title: </span>{title}</p>
                            <p><span className='bold'>Description: </span>{description}</p>
                            <p><span className='bold'>Price: </span>{price}$</p>
                            <p><span className='bold'>Seller contacts: </span>{useremail}</p>
                            <div style={{textAlign: "center"}} hidden={userUid == user.uid}>
                                <button className="counterButton" onClick={decrement}>-</button>
                                <label><span className='bold'>qty: </span>{count}</label>
                                <button className="counterButton" onClick={increment}>+</button>
                            </div>
                        </div>
                        <div className='btnContainer'>
                            <button className='btnPrimary' hidden={userUid !== user.uid}
                                    onClick={() => navigate(`/update/${id}`)}>
                                <span className='bold'>Update</span>
                            </button>
                            <button className='btnDelete' hidden={userUid !== user.uid}
                                    onClick={() => handleDelete(id)}>
                                <span className='bold'>Delete</span>
                            </button>
                            <button className='btnPrimary' hidden={userUid == user.uid} onClick={submitCart}>
                                <span className='bold'>Add to cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };






export default Modal;




