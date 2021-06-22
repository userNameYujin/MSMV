import axios from 'axios';
import React, { useState } from 'react';
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

/*   const [SearchCrit, setSearchCrit] = useState();
  const SearchCritCheck = (e) => {
    setSearchCrit({searchCrit: e.target.value});
  };

  useEffect(() => {
    SearchCritCheck();
  }, []);

  
  const SearchClick = async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/search/${Searchcrit}`, {withCredentials: true})
  } */

  return (
    <HeaderPresenter user={user} LogoutClick={LogoutClick}/*SearchClick={SearchClick}*//>
  );
}

export default Header;