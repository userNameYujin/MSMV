import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import '../../App.css';

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
  font-size: 30px;
  font-weight: 600;
  font-family: 'Nanum Pen Script', cursive;
`;

const GrayBackground = styled.div`
    background: #eaeaea;
    display: flex;
    justify-content: center;
    height: auto;
`;

const MainPresenter = ({topTenData, boxOfficeData}) => {
  return (
    <Wrapper>
    <GrayBackground>
    <MainPage>
      <MainDiv>
        <SearchedDiv>
          <BoxOfficeTitle>어제자 검색 영화 TOP8</BoxOfficeTitle>
          <hr />
          <Row gutter={[16,16]}>
          {topTenData && topTenData.map((movie, index) => ( 
            <React.Fragment key={movie.movieCd}>
              <Col lg={3} md={6} xs={12}>
                <Link to={`/Detail?code=${movie.movieCd}`}>
                  <img style={{ width:'100%', height:'200px'}} src={movie.image} alt={movie.title}></img>
                </Link>
               <p>{movie.rank}</p>
              </Col>
            </React.Fragment>
          ))}
          </Row>
        </SearchedDiv>
        <BoxofficeDiv>
          <BoxOfficeTitle>최근 박스오피스 개봉영화 TOP10</BoxOfficeTitle>
          <hr />
          <Row gutter={[16,16]}>
          {boxOfficeData && boxOfficeData.map((movie, index) => ( 
            <React.Fragment key={movie.movieCd}>
              <Col lg={3} md={6} xs={12}>
                <Link to={`/Detail?code=${movie.movieCd}`}>
                  <img style={{ width:'100%', height:'200px'}} src={movie.image} alt={movie.name}></img>
                </Link>
               <p>{movie.movierank}</p>
              </Col>
            </React.Fragment>
          ))}
          </Row>         

        </BoxofficeDiv>
      </MainDiv>
    </MainPage>
    </GrayBackground>
    </Wrapper>
  );
};

export default MainPresenter;