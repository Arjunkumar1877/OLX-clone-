import "./Create.css";
import Header from "../Header/Header";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext, FirebaseContext } from "../../store/Context";
import { useNavigate } from "react-router-dom";
// import { getDownloadURL, getStorage, ref } from "firebase/storage";
// import 'firebase/storage';
const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()
  const date = new Date();
  const handleSubmit = () => {
    if (!image) {
      console.error("No image selected for upload");
      return;
    }
  
    const storageRef = firebase.storage().ref(`/images/${image.name}`);
    
    storageRef.put(image).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        console.log(url);

        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url: url,
          userId: user.uid,
          createdAt: date.toDateString()
        })

        navigate('/')

      }).catch((error) => {
        console.error("Error getting download URL:", error);
      });
    }).catch((error) => {
      console.error("Error uploading file:", error);
    });
  };
  

  return (
    <>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            value={name}
            type="text"
            id="fname"
            name="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <br />

          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image && URL.createObjectURL(image)}
          ></img>

          <br />
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </>
  );
};

export default Create;
