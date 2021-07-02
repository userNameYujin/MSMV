import React, {optionsState} from "react";
import {Link} from "react-router-dom";

const SearchPresenter = ({searchCritCheck, searchCrit, submitSearch, takeInput, inputEnter, searchContent, result, currentSearch}) => {

  return (
    <div>
      <p>현재 검색: {searchCrit}</p>
      <select name="SearchCrit" value={optionsState} onChange={searchCritCheck}>
        <option value="title">제목</option>
        <option value="director">감독</option>
      </select>
      <input onChange={takeInput} onKeyPress={inputEnter} placeholder="검색어 입력"></input>
      <button onClick={submitSearch}>검색</button>
      <div>
        <h1>{currentSearch}에 대한 검색 결과</h1>
          {result.map((movie, index) => ( 
            <div>
              <img alt={movie.title} src={movie.image}></img>
              <Link to={`/Detail?code=${movie.movieCd}`}>{movie.title}</Link> <p>{movie.rate}</p>
            </div>
          ))}
      </div>  
    </div>
  )
}

export default SearchPresenter;