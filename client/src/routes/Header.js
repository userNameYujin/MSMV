import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import store from '../store';
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

  const [searchCrit, setSearchCrit] = useState('title');
  const props = {searchCrit};


  const SearchCritCheck = (e) => {
    setSearchCrit(e.target.value);
  };

  const history = useHistory();
  const location = useLocation();
  const SearchClick = () => {
    if (location.pathname === "/Search") {
      console.log("push from same");
      window.history.pushState({searchCrit: searchCrit}, null);
    }
    else {
      console.log("push from other");
      history.push({
        pathname: "/Search",
        state: {searchCrit: searchCrit}
      }
    )}
  } 

  return (
    <HeaderPresenter user={user} LogoutClick={LogoutClick} SearchCritCheck={SearchCritCheck} SearchClick={SearchClick}/>
  );
}

export default Header;