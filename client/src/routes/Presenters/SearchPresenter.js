import React, {optionsState} from "react";

const SearchPresenter = ({searchCritCheck, searchCrit, submitSearch, takeInput}) => {
  
  return (
    <div>
      <p>현재 검색: {searchCrit}</p>
      <select name="SearchCrit" value={optionsState} onChange={searchCritCheck}>
        <option value="title">제목</option>
        <option value="director">감독</option>
      </select>
      <input onChange={takeInput} placeholder="검색어 입력"></input>
      <button onClick={submitSearch}>검색</button>
    </div>
  )
}

export default SearchPresenter;