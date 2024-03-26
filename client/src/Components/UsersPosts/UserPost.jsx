
import { useContext, useEffect, useState } from 'react';
import Heart from '../../assets/Heart';
import './UserPost.css';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

function UserPost() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { setPostDetail } = useContext(PostContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return; 

    const fetchProducts = async () => {
      try {
        const snapshot = await firebase.firestore()
          .collection('products')
          .where('userId', '==', user.uid) 
          .get();

        const allPosts = snapshot.docs.map(product => ({
          ...product.data(),
          id: product.id,
        }));

        setProducts(allPosts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [user]); // Fetch pro

  console.log(products)

  const handleDelete = async (id) => {
    try {
        setProducts(products.filter(item => item.id !== id));
      const productRef = firebase.firestore().collection('products').doc(id);
  
      await productRef.delete();
  

      
      console.log('Product deleted successfully!');

    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="postParentDiv">
    <div className="moreView">
      <Header />
      <div className="cards">
        {products.map((product, index) => (
          <div key={index}>
            <div
              className="card"
              onClick={() => {
                setPostDetail(product);
                navigate('/view');
              }}
            >
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name"> {product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
            <button
              className="deleteButton"
              onClick={(e) => {
                e.stopPropagation(); 
                handleDelete(product.id); 
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
    {/* Recommendations section */}
    <div className="recommendations">
      <div className="heading">
        <span>Fresh recommendations</span>
      </div>
      <div className="cards">
        <div className="card">
          <div className="favorite">
            <Heart />
          </div>
          <div className="image">
            <img src="../../../Images/R15V3.jpg" alt="" />
          </div>
          <div className="content">
            <p className="rate">&#x20B9; 250000</p>
            <span className="kilometer">Two Wheeler</span>
            <p className="name"> YAMAHA R15V3</p>
          </div>
          <div className="date">
            <span>10/5/2021</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default UserPost;
