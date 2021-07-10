import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';


const Wrapper = styled.div`
    padding-top: 60px; 
`;

const MainPage = styled.div`

  background-color: ffffff;
`;

const MainDiv = styled.div`
  
`;

const SearchedDiv = styled.div`

`;

const BoxofficeDiv = styled.div`
  display: inline-block;
`;

const Boxoffice = styled.div`

  display: flex;

  width: 1300px;
  background: #606060;
  float: right;
  list-style: none;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 15px 10px #000;
  font-family: 'Noto Sans KR', sans-serif;
`;

const BoxofficeImg = styled.div`
  display: inline-block;
  
  width: 390px;
  height: auto;
  margin: 10px -90px 0px -90px;
`;

const BoxofficeTitle = styled.div`

  text-decoration: none;
  margin-bottom: 50px;
  
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
          <Boxoffice>
            {boxOfficeData.map((movie, index) => ( 
              <div key={movie.movieCd}>
                <BoxofficeImg>
                  <img src={movie.image} alt={movie.name}></img>
                </BoxofficeImg>
                <BoxofficeTitle>
                  <Link to={`/Detail?code=${movie.movieCd}`}>{movie.name}</Link> <p>{movie.rank}</p>                  
                </BoxofficeTitle>
              </div>
            ))}
          </Boxoffice>
        </BoxofficeDiv>
      </MainDiv>
    </MainPage>
    </Wrapper>
  );
};

export default MainPresenter;