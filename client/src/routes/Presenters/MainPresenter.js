import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';

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
          
          <li>최근 박스오피스 개봉영화</li>
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