import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import MovieCard from './MovieCard';

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

const SearchContainer = ({ onSearch }) => {
  return (
    <div>
      <input type={"text"} placeholder={"검색"} onChange={onSearch}></input>
          <Link to='Search'> <SearchButton> Search</SearchButton></Link>
    </div>

  )
}
export default SearchContainer;