import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import SignupPage from './Pages/Signup';
import Login from './Components/Login/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost'
import { useContext, useEffect } from 'react';
import { AuthContext, FirebaseContext } from './store/Context';
import Post, { PostContext } from './store/PostContext';
import UserPost from './Components/UsersPosts/UserPost';
import Header from './Components/Header/Header';

function App() {

  const {  setUser } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext);
  
  // console.log(user)

  useEffect(()=>{
  firebase.auth().onAuthStateChanged((user)=>{
    setUser(user);

  })
  }, [])
  return (
    <div>
  <Post>
  <Router>
  <Header/>
<br />
<br />
     <Routes>
      <Route path='/' element={ <Home />} />
      <Route path='/signup' element={ <SignupPage />} />
      <Route path='/signup' element={ <SignupPage />} />
      <Route path='/login' element={ <Login />} />
      <Route path='/create' element={ <Create />} />
      <Route path='/view' element={<View />} />
      <Route path='/userPost' element={<UserPost />} />
     </Routes>
    </Router>
  </Post>
    </div>
  );
}

export default App;