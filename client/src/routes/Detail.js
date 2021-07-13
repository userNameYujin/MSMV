import React, {useState, useEffect} from 'react';
import DetailPresenter from "./Presenters/DetailPresenter.js";
import {useLocation} from "react-router";
import axios from "axios";
import store from "../store";

const Detail = () => {
  // below for detail code
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const movieCd = searchParams.get("code")
  const [movieData, setMovieData] = useState([]);
  const [movieReviews, setMovieReviews] = useState([]);
  const [peoples, setPeoples] = useState([]);

  const getMovieData = async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/post/detail/${movieCd}`, { movieCd })
    .then((response) => {
      setMovieData(response.data.result);
      setMovieReviews(response.data.result.review);
      setPeoples(response.data.result.people);
      console.log(response.data.result);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => getMovieData(), []);
  
  // below for review code



  const [reviewContent, setReviewContent] = useState('');
  //const [rating, setRate] = useState(0);

  const submitWriteReview = async () => {
    const contents = reviewContent;
    const commenter = store.getState().user.id;
    const rate = 5;

    await axios.post(`${process.env.REACT_APP_SERVER_URL}/review/review/write`, { contents, commenter, rate, movieCd })
    .then((response) => {
     console.log(response);
     window.alert("리뷰 작성 완료")
    })
    .catch((error)=> {
      console.log(error);
      window.alert("리뷰 작성 중 오류 발생")
    }) 
  }

  const reviewOnChange = (e) => {
    setReviewContent(e.target.value);
  }

  const setRatingClick = (e) => {
    return 5; // 임시
    // 클릭 위치에 따라 내가 줄 평점을 설정
  }

  const writeOnClick = () => {
    submitWriteReview();
  }

  const deleteOnClick = (self) => {
    submitDeleteReview(self);
  }

  const [id, setId] = useState(''); // id value for Delete Review 
  const submitDeleteReview = async (e) => {
    setId(e.target.id);
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/review/review/delete`, { id })
    .then((response) => {
     console.log(response);
     window.alert("리뷰 삭제 완료")
    })
    .catch((error)=> {
      console.log(error);
      window.alert("리뷰 삭제 중 오류 발생")
    }) 
  }
  
  return (

    <DetailPresenter movieData={movieData} movieReviews={movieReviews} peoples={peoples} reviewOnChange={reviewOnChange} writeOnClick={writeOnClick} submitDeleteReview={submitDeleteReview}/*{setRatingClick={setRatingClick}}*//>

  )
}

export default Detail;