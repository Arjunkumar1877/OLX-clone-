
import { useContext, useEffect, useState } from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import { AuthContext, FirebaseContext } from '../../store/Context';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
const { firebase } = useContext(FirebaseContext)
 const handleLogin = (e)=>{
  e.preventDefault();
  console.log(email + password)
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(()=>{
    // alert("logged in")
    navigate('/')
  })
  .catch((error)=>{
    alert(error.message)
  })
 }
const { user } = useContext(AuthContext)
 

 useEffect(()=>{
  if(user){
    navigate('/');
  }
},[])

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            onChange={(e)=> setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
          onChange={(e)=> setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to={'/signup'}>
        Signup
        </Link>
      </div>
    </div>
  );
}

export default Login;
