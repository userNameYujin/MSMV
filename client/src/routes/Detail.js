import React, {useState, useEffect} from 'react';
import DetailPresenter from "./Presenters/DetailPresenter.js";
import {useLocation} from "react-router";
import axios from "axios";

const Detail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const movieCd = searchParams.get("code")
  const [movieData, setMovieData] = useState([]);
  
  const getMovieData = async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/post/detail/${movieCd}`, { movieCd })
    .then((response) => {
      setMovieData(response.data.result);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  console.log(movieCd);
  console.log(movieData);
  useEffect(() => getMovieData(), []);

  return (
    <DetailPresenter movieData={movieData}/>
  )
}

export default Detail;