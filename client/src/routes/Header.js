import axios from 'axios';
import React, { useState } from 'react';
import store from '../store';
import {useHistory} from "react-router";
import HeaderPresenter from './Presenters/HeaderPresenter'

const Header = () => {
  const [user, setUser] = useState(store.getState().user);
  const sUser = () => setUser(store.getState().user);
  store.subscribe(sUser);

  
  const LogoutClick = async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {withCredentials: true})
    .then(() => store.dispatch({type : 'LOGOUT'}))
    .catch((e) => console.error(e));
  };
  // check isinlogin

  const history = useHistory();
  const moveSearch = () => {
    if (window.location.hash === "#/Search")
      ;//do nothing
    else
      history.push("/Search");
  }

  const moveMyPage = () => {
    if (window.location.hash === "#/MyPage")
      ;//do nothing
    else
      history.push("/MyPage");
  }

  return (
    <HeaderPresenter user={user} LogoutClick={LogoutClick} moveSearch={moveSearch} moveMyPage={moveMyPage}/>
  );
}

export default Header;