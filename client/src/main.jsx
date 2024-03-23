import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Context, { FirebaseContext } from './store/Context'
import { Firebase } from './firebase/config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 
 <Context>
 <FirebaseContext.Provider value={Firebase}>
  
 <App/>
 </FirebaseContext.Provider>
 </Context>

  </React.StrictMode>,
)
