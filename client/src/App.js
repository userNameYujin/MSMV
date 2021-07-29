import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Main from './routes/Main.js';
import Auth from './routes/Auth.js';
import Join from './routes/Join.js';
import Header from './routes/Header.js';
import Search from './routes/Search.js';
import Detail from './routes/Detail.js';
import MyPage from './routes/MyPage.js';

import store from "./store";
import axios from 'axios';

import { useEffect, useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'; 
import { Footer } from 'antd/lib/layout/layout';
import styled from 'styled-components';

const FooterDesign = styled(Footer)`
  background-color: skyblue;
`;

function App() {
  const [isLoginChecked, setIsLoginChecked] = useState(false);
  const loginCheck = async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/login`, { withCredentials: true })
    .then(async (result) => {
        console.log(result);
        await store.dispatch({ type: 'LOGIN', user: result.data.dataValues });
        console.log("App.js check logined");
      })
    .catch((error) => {
      console.log(error.response);
      setIsLoginChecked(true);
      console.log("App.js check not logined");
    });
    

  };


  useEffect(() => {
    loginCheck();
  }, []);

  return (
    <div className="App">
      {isLoginChecked && (
        <Router>
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
          <Route exact path="/detail">
            <Detail />
          </Route>
          <Route exact path="/mypage">
            <MyPage />
          </Route>
        </Router>
      )}
      <FooterDesign>this is footer</FooterDesign>
    </div>
    
  );
}

export default App;
