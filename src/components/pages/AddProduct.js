import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {useNavigate, useParams} from "react-router-dom";
import "../styles/Store.css";
import "../styles/AddProduct.css";
import {auth, storage, db } from '../UI/firebaseConfig';
import {Form, Spinner} from "react-bootstrap";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import {addDoc, serverTimestamp, collection, doc, updateDoc, getDoc} from "firebase/firestore"
import Particle from "../styles/Particle";
import "toastify-js/src/toastify.css"
import ValidData from "../ValidData";
import Navigation from "../Navigation";

const initialState = {
    title: "",
    description: "",
    price: "",
    url: "",
    img: "",
};

const Store = () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    const [email, setEmail] = useState("");
    const [data, setData] = useState(initialState);
    const {title, description, price, url} = data;
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const userUid = user?.uid;
    const useremail = user?.email;
    const username = user?.displayName;
    const { id } = useParams();


    useEffect(()=>{
        const uploadFile = () =>{
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            if(file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg'){
                document.getElementById('addProduct').disabled = false;
            } else {
                ValidData("Invalid file format", false)
                document.getElementById('addProduct').disabled = true;
            }

            uploadTask.on("state_changed", (snapshot) =>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                switch (snapshot.state){
                    case "paused":
                        console.log("Upload is Pause");
                        break;
                    case "running":
                        console.log("Upload is Running");
                        break;
                    default:
                        break;
                }
            }, (error) =>{
                console.log(error)
            },
                () =>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
                    setData((prev) => ({...prev, img: downloadURL}));
                });
                }
                );
        };
        file && uploadFile()
    }, [file]);

    useEffect(() =>{
        id && getSingleProduct();
    }, [id]);

    const getSingleProduct = async () =>{
        const docRef = doc(db, "products", id);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()){
            setData(({...snapshot.data()}))
        }
    }

    const handleClick = (e) =>{
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setIsSubmit(true);
        if(!id){
            await addDoc(collection(db, "products"), {
                ...data,
                userUid,
                username,
                url,
                useremail,
                timestamp: serverTimestamp()
            })
            ValidData('Your product successfully added!', true)
        }else{
            try{
                await updateDoc(doc(db,"products", id),{
                    ...data
                });
                ValidData('Your product successfully updated!', true)
            } catch (error){
                console.log(error);
            }
        }

        navigate ("/store")
    }

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
            <Navigation />
            <div className="bg-settingsimage ">
                <Particle/>
                <div className="settingsform">
                    <Form onSubmit={handleSubmit} >
                        <h2>{id ? "Update your product" : "Add your product"}</h2>
                        <hr/>
                        <label htmlFor="product-name">Product title</label>
                        <br/>
                        <input type="text" className="form-control" required
                               onChange={handleClick} value={title} name="title"
                        />
                        <br/>
                        <label htmlFor="product-desc">Product description</label>
                        <br/>
                        <input type="text" className="form-control" required
                               onChange={handleClick} value={description} name="description"
                        />
                        <br/>
                        <label htmlFor="product-desc">Url</label>
                        <br/>
                        <input type="text" className="form-control" required
                               onChange={handleClick} value={url} name="url"
                        />
                        <br/>
                        <label htmlFor="product-price">Product price</label>
                        <br/>
                        <div className="currency-wrap">
                            <span className="currency-code" style={{marginTop: "-20px"}}>$</span>
                            <input type="number" className="form-control"
                                   onChange={handleClick} value={price} name="price"
                            />
                        </div>
                        <br/>
                        <label htmlFor="product-name">Product image(png/jpg only)</label>
                        <br/>
                        <input type="file" id="file" className="form-control" required
                               onChange={(e)=> setFile(e.target.files[0])}
                        />
                        <br/>
                        <button id="addProduct" className="btn btn-success btn-md mybtn" disabled={progress !== null && progress < 100}> Add</button>
                    </Form>
                </div>
            </div>

        </>
    );
}


export default Store;


