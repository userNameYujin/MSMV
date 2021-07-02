import React from 'react';

const DetailPresenter = ({movieData}) => {
  return (
    <div>
      <li>
        {movieData.title}
      </li>
      <li>
        {movieData.openDt}
      </li>
      <li>
        <img src={movieData.image} alt="movieData.title"/>
      </li>
      <li>
        {movieData.grade}
      </li>
      <li>
        {movieData.genres}
      </li>
      <li>
        {movieData.country}
      </li>
      <li>
        {movieData.runningTime}
      </li>
      <li>
        {movieData.summary}
      </li>
    </div>
  )
}

export default DetailPresenter;