import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const MainPage = styled.div`
`;

const MainDiv = styled.div`
`;

const SearchedDiv = styled.div`
`;

const BoxofficeDiv = styled.div`
`;

const MainPresenter = ({boxOfficeData}) => {
  return (
    <MainPage>
      <MainDiv>
        <SearchedDiv>
          <p>this div is for 'yesterday searched movies</p>
        </SearchedDiv>
        <BoxofficeDiv>
          <p>this div is for 'daily boxoffice movies'</p>
          {boxOfficeData.map((movie, index) => ( 
            <div key={movie.movieCd}>
              <img src={movie.image} alt={movie.name}></img>
              <Link to={`/Detail?code=${movie.movieCd}`}>{movie.name}</Link> <p>{movie.rank}</p>
            </div>
          ))}
        </BoxofficeDiv>
      </MainDiv>
    </MainPage>
  );
};

export default MainPresenter;