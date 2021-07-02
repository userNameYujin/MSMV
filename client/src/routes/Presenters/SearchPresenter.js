import React, {optionsState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const SearchPresenter = ({searchCritCheck, searchCrit, submitSearch, takeInput, searchContent, result, currentSearch}) => {

  const Shape = styled.div`
    display: block;
    flex: 1;
    margin-left: auto;
    margin-right: auto; 
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    width: 65%;
    height: auto;
    background: lightgray;

  
  `;

  const MovieDiv = styled.div`
    display: inline-block;
    
    margin-left: auto;
    margin-right: auto;
    width: 400px;
    height: 300px;
    background: #606060;
    float: right;
    list-style: none;
    padding: 10px;
    margin: 10px 20px 30px 10px;
    border-radius: 10px;
    box-shadow: 0 15px 10px #000;
    font-family: 'Noto Sans KR', sans-serif;

  `;

  const Image = styled.div`

    width: 200px;
    height: 200px;
    size: cover;
  `;  
  
  const Info = styled.div`
    display:
    font-size: 20px;
  `;

  return (
    <div>
      <p>현재 검색: {searchCrit}</p>
      <select name="SearchCrit" value={optionsState} onChange={searchCritCheck}>
        <option value="title">제목</option>
        <option value="director">감독</option>
      </select>
      <input onChange={takeInput} placeholder="검색어 입력"></input>
      <button onClick={submitSearch}>검색</button>
      <Shape>
        <h>-----------------------------------------{currentSearch}에 대한 검색 결과-----------------------------------------</h>
          {result.map((movie, index) => ( 
            
            <MovieDiv>
              <Image>
                <img src={movie.image}></img>
              </Image>
              <Info>
                <Link to={`/Detail?code=${movie.movieCd}`}>{movie.title}</Link> <p>{movie.rate}</p>
              </Info>
              
            </MovieDiv>
          ))}
      </Shape>  
    </div>
  )
}

export default SearchPresenter;