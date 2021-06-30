import React, {optionsState} from "react";
import {Link} from "react-router-dom";

const SearchPresenter = ({searchCritCheck, searchCrit, submitSearch, takeInput, searchContent, result, currentSearch}) => {
  let link;

  return (
    <div>
      <p>현재 검색: {searchCrit}</p>
      <select name="SearchCrit" value={optionsState} onChange={searchCritCheck}>
        <option value="title">제목</option>
        <option value="director">감독</option>
      </select>
      <input onChange={takeInput} placeholder="검색어 입력"></input>
      <button onClick={submitSearch}>검색</button>
      <div>
        <h>{currentSearch}에 대한 검색 결과</h>
          {result.map((movie, index) => ( 
            <div>  
              <Link to={`/Detail?code=${movie.movieCd}`}>{movie.title}</Link> <p>{movie.rate}</p>
            </div>
          ))}
      </div>  
    </div>
  )
}

export default SearchPresenter;