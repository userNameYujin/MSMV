import './App.css';
import React from 'react';

import Main from './routes/Main.js';
import Auth from './routes/Auth.js';
import Join from './routes/Join.js';
import Header from './routes/Header.js';
import Search from './routes/Search.js';

import store from "./store";
import axios from 'axios';

import { useEffect, useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'; 


function App() {
  const [isLoginChecked, setIsLoginChecked] = useState(false);
  const loginCheck = async () => {

    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/auth/login`, { withCredentials: true })
      .then(async (result) => {

    await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/login`, { withCredentials: true })
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
          <Route exact path="/login">
            <Auth />
          </Route>
          <Route exact path="/join">
            <Join />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
        </Router>
      )}
    </>
  );
}

export default App;
