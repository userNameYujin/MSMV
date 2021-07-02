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
  const moveSearch = (e) => {
    if (window.location.hash === "#/Search")
      ;//do nothing
    else
      history.push("/search");
  }

  return (
    <HeaderPresenter user={user} LogoutClick={LogoutClick} moveSearch={moveSearch}/>
  );
}

export default Header;