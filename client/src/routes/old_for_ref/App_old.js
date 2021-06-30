import './App.css';
import React from 'react';
import Main from './routes/Main';
import Auth from './routes/Auth';
import Join from './routes/Join';
import Header from './routes/Header';
import Search from './routes/Search';

import { useEffect, useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'; 
import store from "./store";
import axios from 'axios';

function App() {
  const [isLoginChecked, setIsLoginChecked] = useState(false);
  const loginCheck = async () => {
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/login`, { withCredentials: true })
      .then(async (result) => {
        console.log(result);
        await store.dispatch({ type: 'LOGIN', user: result.data.dataValues });
      })
      .catch((error) => {
        console.log(error.response.data);
        setIsLoginChecked(true);
      });
  };


  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <>
      {isLoginChecked && (
        <Router className="App">
            <Header />
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/Auth">
            <Auth />
          </Route>
          <Route exact path="/Join">
            <Join />
          </Route>
          <Route exact path="/Search">
            <Search />
          </Route>
        </Router>
      )}
    </>
  );
}

export default App;
