import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import {useHistory} from "react-router";

/*const input = `
  height: 15%;
  display: flex;
  align-items: center;
`;*/



const SearchButton = styled.button`
margin: 0px 10px;
font-size: 14px;
font-weight: 400;
border: none;
cursor: pointer;
background-color: #ffffff;
`;



const SearchContainer = () => {
  const history = useHistory();
  const [value, setValue] = useState();

  const onSearch = (e) => {
    setValue({value: e.target.value});
  }

  const submitSearch = (e) => {
    if (e.key === 'Enter')
      history.push({
        pathname: `/Search?keyword=${value.value}`,
      })
  }

  const pressSearch = (e) => {
    history.push({
      pathname: `/Search?keyword=${value.value}`,
    })
  }

  return (
    <div>
      <div>
        <input type={"text"} placeholder={"검색"}  onChange={onSearch} onKeyPress={submitSearch} />
        <SearchButton onClick={pressSearch}> Search</SearchButton>
      </div>
    </div>
  )
}

export default SearchContainer;