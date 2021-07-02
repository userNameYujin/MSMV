import React, {optionsState} from "react";
import {Link} from "react-router-dom";
import styled from 'styled-components';

const Wrapper = styled.div`
    padding-top: 60px; 
`;

const SearchTitle = styled.div`

  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: 600;
`;

const Input = styled.input`

  padding: 0px 10px;
  box-sizing: border-box;
  width: 40%;
  height: 40px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 2px solid black;
  border-radius: 3px;
  transition: border 0.1s ease-in-out;
  outline: none;
  &:hover,
  &:focus {
    border: 2px solid red;
  }
`;

const SearchButton = styled(Link)`
font-weight: 600;
color: red;
border: 1px solid red;
background-color: black;
padding: 0.5rem;
padding-bottom: 0.4rem;
cursor: pointer;
border-radius: 3px;
text-decoration: none;
transition: .2s all;

&:hover {
    background: black;
    color: white;
}
`;
const Spacer = styled.div`
    flex-grow: 0.01;
`;

const SearchAsk = styled.div`
    margin: 10px 10px 10px 10px;
`;


const SearchResult = styled.div`
    margin: 10px 10px 10px 10px;
`;

const SearchPresenter = ({searchCritCheck, searchCrit, submitSearch, takeInput, searchContent, result, currentSearch}) => {
  let link;

  return (
    <Wrapper>
    <div>
    <SearchAsk>
      <SearchTitle>현재 검색: {searchCrit}</SearchTitle>
      <select name="SearchCrit" value={optionsState} onChange={searchCritCheck}>
        <option value="title">제목</option>
        <option value="director">감독</option>
      </select>
      <Spacer/>
      <Input onChange={takeInput} placeholder="검색어 입력"></Input>
      <Spacer/>
      <SearchButton onClick={submitSearch}>검색</SearchButton>
      </SearchAsk>
      <SearchResult>
      <div>
        <h>{currentSearch}에 대한 검색 결과</h>
          {result.map((movie, index) => ( 
            <div>  
              <Link to={`/Detail?code=${movie.movieCd}`}>{movie.title}</Link> <p>{movie.rate}</p>
            </div>
          ))}
      </div>
      </SearchResult>  
    </div>
    </Wrapper>
  )
}

export default SearchPresenter;