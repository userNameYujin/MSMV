import React, {useState} from 'react';
import {useLocation, useHistory} from 'react-router';
import SearchPresenter from './Presenters/SearchPresenter';

const Search = () => {
  const [searchCrit, setSearchCrit] = useState("title");
  const [searchContent, setSearchContent] = useState('');

  const history = useHistory();
  const location = useLocation();

  const submitSearch = () => {
    
  }

  const takeInput = (e) => {
    setSearchContent(e.target.value);
    console.log(searchContent);
  }

  const SearchCritCheck = (e) => {
    setSearchCrit(e.target.value);
    console.log(searchCrit);
  };

  return ( 
    <SearchPresenter searchCritCheck={SearchCritCheck} searchCrit={searchCrit} submitSearch={submitSearch} takeInput={takeInput}/>
  )
}

export default Search;