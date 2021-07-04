import React, {useState, useEffect} from 'react';
import DetailPresenter from "./Presenters/DetailPresenter.js";
import {useLocation} from "react-router";
import axios from "axios";

const Detail = () => {
  // below for detail code
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const movieCd = searchParams.get("code")
  const [movieData, setMovieData] = useState([]);
  
  const getMovieData = async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/post/detail/${movieCd}`, { movieCd })
    .then((response) => {
      setMovieData(response.data.result);
      console.log(response.data.result);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => getMovieData(), []);
  
  // below for review code
  const [reviewContent, setReviewContent] = useState('');

  const submitWriteReview = () => {

  }

  const reviewOnChange = (e) => {
    setReviewContent(e.target.value);
    console.log(reviewContent);
  }

  const reviewOnClick = () => {
    submitWriteReview();
  }

  const reviewOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      reviewOnClick();
    }
  }

  
  return (
    <DetailPresenter movieData={movieData} reviewOnChange={reviewOnChange} reviewOnClick={reviewOnClick} reviewOnKeyPress={reviewOnKeyPress} />
  )
}

export default Detail;