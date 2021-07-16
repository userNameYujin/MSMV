import React, {optionsState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
    padding-top: 105px; 
`;

const SearchTitle = styled.div`
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: 600;
  
`;

const Input = styled.input`
  
  padding: 0px 10px;
  box-sizing: border-box;
  width: 500px;
  height: 40px;
  margin-top: 5px;
  margin-bottom: 20px;
  border: 2px solid black;
  border-radius: 3px;
  transition: border 0.1s ease-in-out;
  outline: none;
  &:hover,
  &:focus {
    border: 2px solid #6B66FF;
  }
`;

const SearchButton = styled.button`
  font-weight: 600;
  width: 55px;
  color: #6B66FF;
  border: 1px solid #6B66FF;
  background-color: lightgray;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  border-radius: 3px;
  text-decoration: none;
  transition: .2s all;

  &:hover {
      background: #6B66FF;
      color: white;
  }
`;
const Spacer = styled.div`
    flex-grow: 0.01;
    float: left;
`;

const SearchAsk = styled.div`
    margin: 10px 10px 10px 10px;
    float: left;
`;


const SearchResult = styled.div`
    margin: 10px 10px 10px 10px;
`;

const Shape = styled.div`
    display: inline-block;
    flex: 1;
    margin: 0 auto 0 auto;
    text-align: left;
    width: 72%;
    height: auto;
    background: lightgray;
    font-size: 10px;

  
  `;

const MovieDiv = styled.div`
 
  margin-left: auto;
  margin-right: auto;
  width: 500px;
  height: 310px;
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
  float: left;
  width: 50%
  height: 100%;
  size: cover;
`;  

const InfoBox = styled.div`
  float: left;
  width: 50%;
  height: 100%;
  text-align: center;
  font-size: 20px;
`;

const InfoName = styled.div`
  display: inline-block;
  font-size: 25px;
`;

const InfoRate = styled.div`
  font-size: 20px;
`;


const SelectType = styled.div`
  float: left;
  width: 80px;
  height: 40px;
  padding: 9px;
`;



const SearchPresenter = ({searchCritCheck, searchCrit, submitSearch, takeInput, result, currentSearch, inputEnter}) => {

  for (let i = 0 ; i < result.length; i++) {
    result[i].title = result[i].title.replace(/<b>/igm, '');
    result[i].title = result[i].title.replace(/<\/b>/igm, '');
  }

  return (
    <Wrapper>
    <div>
    <SearchAsk>
      <SearchTitle></SearchTitle>
      <SelectType>
        <select name="SearchCrit" value={optionsState} onChange={searchCritCheck}>
        <option value="title">제목</option>
        <option value="director">감독</option>
      </select>
      </SelectType>


      <Spacer/>
      <Input onChange={takeInput} onKeyPress={inputEnter} placeholder="검색어 입력"></Input>
      <Spacer/>
        <SearchButton onClick={submitSearch}>검색</SearchButton>
      
      
    </SearchAsk>
    <SearchResult>
    <Shape>
      {currentSearch ? (<>
        {/* 무언가가 검색되었을 때의 표시 공간 */}
        <h1> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; '{currentSearch}' 전체 검색결과가 건 발견되었습니다.</h1>
        {result.map((movie) => ( 
              
          <MovieDiv key={movie.movieCd}>
            <Image>
              <img alt="movie" src={movie.image}></img>
            </Image>
            <InfoBox>
              <InfoName>
                <Link to={`/Detail?code=${movie.movieCd}`}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{movie.title}</Link> 
              </InfoName>
              <InfoRate>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;평점 &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{movie.rate} <br/>
                  {movie.date} <br/>
                  {movie.summary}
                </p>
              </InfoRate>
              
            </InfoBox>
          </MovieDiv>))}</>) : (
        <>
        {/* 아무것도 검색되지 않았을 때의 표시 공간 */}
            <p>검색할 키워드를 입력하세요</p>

        </>)}
      
    </Shape>
    </SearchResult>  

    </div>
    </Wrapper>
  )
}

export default SearchPresenter;