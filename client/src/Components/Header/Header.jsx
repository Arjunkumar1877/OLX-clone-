
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useContext } from 'react';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { Link, useNavigate } from 'react-router-dom';
function Header() {
  const { user} = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext)
  const navigate  =  useNavigate()
  


  const handleLogout = ()=>{
    firebase.auth().signOut()
    .then(()=>{
      navigate("/login")
    })
    console.log('logout')
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <Link to={'/'}><span> HOME </span></Link>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{user ? <Link to={'/userPost'}>`Welcome ${user.displayName}` </Link>: <Link to={'/login'}>Login</Link>}</span>

          <hr />
        </div>
        {user && <span onClick={handleLogout} style={{cursor: "pointer"}}>Logout</span>}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            {
              user && <Link to={'/create'}>
              <span>SELL</span>
              </Link>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
