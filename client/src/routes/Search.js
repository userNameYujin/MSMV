import React, {useState} from 'react';
import axios from 'axios';
//import {useLocation, useHistory} from 'react-router';
import SearchPresenter from './Presenters/SearchPresenter';

const Search = () => {
  const [searchCrit, setSearchCrit] = useState("title");
  const [searchContent, setSearchContent] = useState('');
  const [result, setResult] = useState([]);
  const [currentSearch, setCurrentSearch] = useState('');
  const props = {searchContent, result, currentSearch};
  // const history = useHistory();
  // const location = useLocation();

  const submitSearch = async () => {
    setCurrentSearch(searchContent);
    if (searchCrit === "title") {
      console.log("search from title");
      const check = 1;
      const movieNm = searchContent;
      console.log("start axios");
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/search`, { check, movieNm })
      .then((response) => {
        console.log(response);
        setResult(response.data.result);
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
      console.log("end axios");
      console.log(result);
    }
    else if (searchCrit === "director") {
      console.log("search from director");
      const check = 2;
      const dirNm = searchContent;
      console.log("start axios");
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/search`, { check, dirNm })
      .then((response) => {
        console.log(response);
        setResult(response.data.result);
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
      console.log("end axios");
      console.log(result);
    }
  }
  

  const takeInput = (e) => {
    setSearchContent(e.target.value);
  }

  const SearchCritCheck = (e) => {
    setSearchCrit(e.target.value);
  };

  return ( 
    <SearchPresenter searchCritCheck={SearchCritCheck} searchCrit={searchCrit} submitSearch={submitSearch} takeInput={takeInput} {...props}/>
  )
}

export default Search;