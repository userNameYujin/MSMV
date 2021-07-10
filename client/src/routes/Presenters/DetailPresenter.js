import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {Descriptions, Badge} from 'antd';
import 'antd/dist/antd.css';
import 'antd/dist/antd.less';

const Wrapper = styled.div`
    padding-top: 60px; 
`;

const ReviewButton = styled(Link)`
font-weight: 600;
color: red;
border: 1px solid red;
padding: 0.5rem;
padding-bottom: 0.4rem;
cursor: pointer;
border-radius: 2px;
text-decoration: none;
transition: .2s all;
background: black;

&:hover {
    background-color: white;
    color: black;
}
`;
const ReviewTitle = styled.div`
  margin-top: 50px;
  font-size: 20px;
  font-weight: 600;
`;

const DetailPresenter = ({movieData, handleClick, reviewValue}) => {
  return (
    <Wrapper>
      <br />
      
        <img src={movieData.image} alt="movieData.title"/>
      
      <br />
      <Descriptions title="영화 정보" bordered>
        <Descriptions.Item label="영화 제목">{movieData.title}</Descriptions.Item>
        <Descriptions.Item label="개봉 날짜">{movieData.openDt}</Descriptions.Item>
        <Descriptions.Item label="관람등급">{movieData.grade}</Descriptions.Item>
        <Descriptions.Item label="장르">{movieData.genres}</Descriptions.Item>
        <Descriptions.Item label="국가">{movieData.country}</Descriptions.Item>
        <Descriptions.Item label="상영시간">{movieData.runningTime}</Descriptions.Item>
        <Descriptions.Item label="줄거리" span={3}>{movieData.summary}</Descriptions.Item>
      </Descriptions>
    
    <div>
    <br />
    <ReviewTitle>리뷰</ReviewTitle>
    <hr />
      <form style={{ display: 'flex' }} onSubmit>
                <textArea
                    style={{ width: '80%', borderRadius: '2px' }}
                    onChange={handleClick}
                    value={reviewValue}
                    placeholder="리뷰를 입력해주세요"
                />
                <br />
                <ReviewButton style={{ width: '20%', height: '52px' }} onClick>작성</ReviewButton>
            </form>
            <br/>
    </div>
    </Wrapper>
  
    
  )
}

export default DetailPresenter;