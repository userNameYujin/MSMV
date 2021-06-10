import './App.css';
import React from 'react';
import MainPage from './routes/home';
import Login from './routes/login';
import Join from './routes/join';
import Header from './routes/header';
import Search from './routes/Search';

import { HashRouter as Router, Route } from 'react-router-dom'; 
import store from "./store";
import axios from 'axios';
import { useEffect, useState } from 'react';


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
            <MainPage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/join">
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
