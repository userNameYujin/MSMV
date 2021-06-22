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
        </BoxofficeRankDiv>
      </MainDiv>
    </MainPage>
  );
};

export default MainPresenter;