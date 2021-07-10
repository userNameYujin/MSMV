import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';


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
const BoxOfficeTitle = styled.div`
  margin-top: 50px;
  font-size: 20px;
  font-weight: 600;
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
          <BoxOfficeTitle>최근 박스오피스 개봉영화</BoxOfficeTitle>
          <hr />
          <Row gutter={[16,16]}>
          {boxOfficeData && boxOfficeData.map((movie, index) => ( 
            <React.Fragment key={movie.movieCd}>
              <Col lg={3} md={6} xs={12}>
                <a href={`/#/Detail?code=${movie.movieCd}`}>
                  <img style={{ width:'100%', height:'200px'}} src={movie.image} alt={movie.name}></img>
                </a>
               <p>{movie.rank}</p>
              </Col>
            </React.Fragment>
          ))}
          </Row>
            

        </BoxofficeDiv>
      </MainDiv>
    </MainPage>
    </Wrapper>
  );
};

export default MainPresenter;