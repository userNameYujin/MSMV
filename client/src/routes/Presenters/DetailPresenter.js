import React from 'react';
import store from '../../store';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {Descriptions, Badge, Row, Col} from 'antd';
import 'antd/dist/antd.css';
import 'antd/dist/antd.less';
import '../../App.css';
import StarRatingComponent  from 'react-star-rating-component';

const Wrapper = styled.div`
    padding-top: 60px; 
`;

const ReviewButton = styled.button`
font-weight: 600;
color: white;
border: 1px solid #6799FF;
padding: 0.5rem;
padding-bottom: 0.4rem;
cursor: pointer;
border-radius: 2px;
text-decoration: none;
transition: .2s all;
background:#6B66FF;

&:hover {
    background-color: white;
    color: #6799FF;
}
`;
const ReviewTitle = styled.div`
  margin-top: 50px;
  font-size: 30px;
  font-weight: 600;
  font-family: 'Nanum Pen Script', cursive;
`;

const GrayBackground = styled.div`
    background: #eaeaea;
`;

const Background = styled.div`
    font-family: 'Nanum Pen Script', cursive;
`;



const DetailPresenter = ({movieData, movieReviews, peoples, reviewOnChange, writeOnClick, updateClick, submitDeleteReview, starRating, onStarClick}) => {
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
      <GrayBackground>
      <br />
      
        <img src={movieData.image} alt="movieData.title"/>
      
      <br />
      <Background>
      <Descriptions title="영화 정보" bordered>
        <Descriptions.Item label="영화 제목" contentStyle={{ background: "white" }}>{movieData.title}</Descriptions.Item>
        <Descriptions.Item label="개봉 날짜" contentStyle={{ background: "white" }}>{movieData.openDt}</Descriptions.Item>
        <Descriptions.Item label="관람등급" contentStyle={{ background: "white" }}>{movieData.grade}</Descriptions.Item>
        <Descriptions.Item label="장르" contentStyle={{ background: "white" }}>{movieData.genres}</Descriptions.Item>
        <Descriptions.Item label="국가" contentStyle={{ background: "white" }}>{movieData.country}</Descriptions.Item>
        <Descriptions.Item label="상영시간" contentStyle={{ background: "white" }}>{movieData.runningTime}</Descriptions.Item>
        <Descriptions.Item label="줄거리" span={3} contentStyle={{ background: "white" }}>{movieData.summary}</Descriptions.Item>
        <Descriptions.Item label="감독" span={3} contentStyle={{ background: "white" }}>{director && director.map((people, index) => ( 
          <React.Fragment key={people.index}>
            
              <img src={people.peopleImage} alt={people.peopleName}/><br/>{people.peopleName}
              <p>{people.peopleJob}</p>
            
          </React.Fragment>
        ))}</Descriptions.Item>
        <Descriptions.Item label="배우" span={3} contentStyle={{ background: "white" }}>
        <Row gutter={[16,16]}>
          {actor && actor.map((people, index) => ( 
          <React.Fragment key={people.index}>
            <Col lg={3} md={6} xs={12}>
              <img style={{ width:'100%', height:'150px'}} src={people.peopleImage} alt={people.peopleName}/> {people.peopleName}
              <p>{people.peopleJob}</p>
            </Col>
          </React.Fragment>
        ))}
        
        </Row>
        </Descriptions.Item>
      </Descriptions>
      </Background>
      
      
      
    
    <div>
    <br />
    <ReviewTitle>○영화 리뷰○</ReviewTitle>
    <hr />
      <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={starRating.rating}
          onStarClick={onStarClick}
      />

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
              (store.getState().user.id === review.commenter) ? (
                <button type="button" id={review.id} onClick={submitDeleteReview}>reviewid:{review.id} Delete</button>
                ) : (<p>{review.commenter}, {store.getState().user.id}</p>)
            ) : (<p>not logined</p>)}
            
          </div>
        </React.Fragment>
      ))}
    </div>
    </GrayBackground>
    </Wrapper>
  

  
    
  )
}

export default DetailPresenter;