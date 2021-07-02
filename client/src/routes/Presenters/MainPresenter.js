import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding-top: 60px; 
`;

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
    <Wrapper>
    <MainPage>
      <MainDiv>
        <SearchedDiv>
          <p>this div is for 'yesterday searched movies</p>
        </SearchedDiv>
        <BoxofficeDiv>
          <p>this div is for 'daily boxoffice movies'</p>
          {boxOfficeData.map((movie, index) => ( 
            <div>
              <img src={movie.image}></img>
              <Link to={`/Detail?code=${movie.movieCd}`}>{movie.name}</Link> <p>{movie.rank}</p>
            </div>
          ))}
        </BoxofficeDiv>
      </MainDiv>
    </MainPage>
    </Wrapper>
  );
};

export default MainPresenter;