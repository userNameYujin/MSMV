import React from 'react';
import qs from 'qs';
import axios from 'axios';
import request from 'request';
import MovieCard from '../components/MovieCard';
import jsonData from './item.json';
import { useLocation } from 'react-router';


const NAVER_CLIENT_ID = "uzK_pSQ_WaUUJQ1dj8Me";
const NAVER_CLIENT_SECRET = "nlgAT5sHfD";
const serviceKey = "06675af903736aef8fb3a019a30249a2"



const Search = () => {
  const location = useLocation();
  const searchTitle = location.search.split("=")[1];

  function getName(callback) {
    movieData(searchTitle).then((response) => {
      console.log(response.movieListResult.movieList);
      callback(response.movieListResult.movieList);
    })
  }
  
  function movieData(searchTitle){
    return axios.get(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${serviceKey}&movieNm=${searchTitle}`).then(response =>{

      return response.data
    })
  }

  let getMovieList = [];
  for(let i=0; i<10; i++){
      getName(async function(data) {
        //console.log(data[i]);
        let year = data[i].openDt.split('-')[0];
        const option = {
            query : data[i].movieNm,
            start :1,
            display:1,
            yearfrom:year-1,
            yearto:year,
            sort :'sim',
            filter:'small',
        }
          
          request.get({
              uri: 'https://openapi.naver.com/v1/search/movie.json',
              qs: option,
              headers: {
                  'X-Naver-Client-Id': NAVER_CLIENT_ID,
                  'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
              }
          }, async function (err, res, body) {
              //console.log('쿼리', i, option.query);
              //console.log('개봉일', i, option.yearfrom);
              
              let movieData = JSON.parse(body);
              movieData.items[0].lank = i+1;
              let nameImage = { //데이터 골라서 넣기
                  "lank" : i+1,
                  "name" : movieData.items[0].title,
                  "image" : movieData.items[0].image,
                  "userRating" : movieData.items[0].userRating,
              }
              //console.log('asdfasdf', movieData.items[0]);
              //movieList.push(movieData.items[0]);   모든 데이터 넣기
              getMovieList.push(nameImage);
              
              //console.log('asdf',movieList[1]);
              if(getMovieList.length===10){
                  getMovieList.sort(function(a,b){
                      return parseFloat(a.lank)-parseFloat(b.lank)
                  })
                  //movieList = JSON.stringify(movieList);
                  console.log('일일 박스오피스 리스트',getMovieList);
                  // console.log('제목으로 찾기');
                  // for(let j=0; j<10; j++){
                  //     if(movieList[j].title==='<b>파이프라인</b>'){
                  //         console.log(movieList[j].image);
                  //     }
                  // }
                  console.log('이미지 추출',getMovieList[0].image);
                  
              }
          }) 
          
          }
      )
  }

  return (
    <div>
      
    </div>
  )
}

export default Search;