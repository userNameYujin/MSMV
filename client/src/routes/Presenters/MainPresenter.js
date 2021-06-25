import React from 'react';
import styled from 'styled-components';

const MainPage = styled.div`
`;

const MainDiv = styled.div`
`;

const SearchedRankDiv = styled.div`
`;

const BoxofficeRankDiv = styled.div`
`;

const MainPresenter = () => {
  return (
    <MainPage>
      <MainDiv>
        <SearchedRankDiv>
          <p>this div is for 'yesterday searched rank</p>
        </SearchedRankDiv>
        <BoxofficeRankDiv>
          <p>this div is for 'daily boxoffice rank'</p>
          <img src="https://movie-phinf.pstatic.net/20210609_138/1623220637715dKMK5_JPEG/movie_image.jpg?type=m77_110_2" width="200"></img>
        </BoxofficeRankDiv>
      </MainDiv>
    </MainPage>
  );
};

export default MainPresenter;