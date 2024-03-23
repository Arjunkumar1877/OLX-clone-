import { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
function View() {
  const [userDetails, setUserDetails] = useState({});
  const { postDetail } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);
  console.log(postDetail)
  

  useEffect(()=>{
    const { userId } = postDetail
    firebase.firestore().collection('users').where('id', '==', userId).get().then((res)=>{
      res.forEach((doc)=>{
    setUserDetails(doc.data());
      })
    })
  })


  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetail.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetail.price} </p>
          <span>{postDetail.name}</span>
          <p>{postDetail.category}</p>
          <span>{postDetail.createdAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>+91 {userDetails.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
