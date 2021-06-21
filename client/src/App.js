import './App.css'
import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [isLoginChecked, setIsLoginChecked] = useState(false);
  
  const loginCheck = async () => {
    await axios
    .get(`${process.env.REACT_APP_SERVER_URL}/auth/login`, { withCredentials = true})
    .then(async (result) => {
      await store.dispatch({ type:'LOGIN', user: result.data.dataValues });
    })
    .catch((error) => {
      console.log(error.response.data);
      setIsLoginChecked(true);
    })
  };

  useEffect(()=> {
    loginCheck();
  }, []);

  return (

  )
}

export default App;