import React from 'react';
import styled from 'styled-components';

const List = styled.div`
  margin: auto;
  width: 65%;
`;

const DetailPresenter = ({movieData, reviewOnChange, reviewOnClick, reviewOnKeyPress}) => {
  return (
    <div>
      <List>
        {movieData.title}
      </List>
      <List>
        {movieData.openDt}
      </List>
      <List>
        <img src={movieData.image} alt="movieData.title"/>
      </List>
      <List>
        {movieData.grade}
      </List>
      <List>
        {movieData.genres}
      </List>
      <List>
        {movieData.country}
      </List>
      <List>
        {movieData.runningTime}
      </List>
      <List>
        {movieData.summary}
      </List>

      <div>
        <input onChange={reviewOnChange} onClick={reviewOnClick} onKeyPress={reviewOnKeyPress} placeholder="리뷰 작성"></input>
      </div>
    </div>
  )
}

export default DetailPresenter;