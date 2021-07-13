import React from 'react';
import store from '../../store';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {Descriptions, Badge} from 'antd';
import 'antd/dist/antd.css';
import 'antd/dist/antd.less';

const Wrapper = styled.div`
    padding-top: 60px; 
`;

const ReviewButton = styled.button`
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

const DetailPresenter = ({movieData, movieReviews, peoples, reviewOnChange, writeOnClick, updateClick, submitDeleteReview}) => {
  const director = [];
  const actor = [];

  for (let i = 0 ; i < peoples.length; i++) {
    let people = peoples[i];
    people.peopleJob = people.peopleJob.replace(/\n/g,' ');
    people.peopleJob = people.peopleJob.replace(/\t/g,'');

    if (people.peopleJob === "감독") {
      director.push(people);
    }
    else
      actor.push(people);
  }

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
        <Descriptions.Item label="줄거리">{movieData.summary}</Descriptions.Item>
        <Descriptions.Item label="감독">{director && director.map((people, index) => ( 
          <React.Fragment key={people.index}>
            <div>
              <p><img src={people.peopleImage} alt={people.peopleName}/> {people.peopleName}</p>
              <p>{people.peopleJob}</p>
            </div>
          </React.Fragment>
        ))}</Descriptions.Item>
        <Descriptions.Item label="배우">{actor && actor.map((people, index) => ( 
          <React.Fragment key={people.index}>
            <div>
              <p><img src={people.peopleImage} alt={people.peopleName}/> {people.peopleName}</p>
              <p>{people.peopleJob}</p>
            </div>
          </React.Fragment>
        ))}</Descriptions.Item>
      </Descriptions>
    
    <div>
    <br />
    <ReviewTitle>리뷰</ReviewTitle>
    <hr />
      <form style={{ display: 'flex' }}>
        <textarea style={{ width: '80%', borderRadius: '2px' }}
          onChange={reviewOnChange}
          placeholder="리뷰를 입력해주세요">
        </textarea>
        <br />
        <ReviewButton style={{ width: '20%', height: '52px' }} onClick={writeOnClick}>작성</ReviewButton>
      </form>
      <br/>
      {movieReviews && movieReviews.map((review, index) => ( 
        <React.Fragment key={review.id}>
          <div>
            <p>{review.nickname} : {review.contents}</p>
            <p>Rate : {review.rate}</p>
            {store.getState().user ? (
              (store.getState().user.nickname === review.nickname) ? (
                <button type="button" id={review.id} onClick={submitDeleteReview}>reviewid:{review.id} Delete</button>
                ) : (<p>{review.nickname}, {store.getState().user.nickname}</p>)
            ) : (<p>not logined</p>)}
            
          </div>
        </React.Fragment>
      ))}
    </div>
    </Wrapper>
  

  
    
  )
}

export default DetailPresenter;