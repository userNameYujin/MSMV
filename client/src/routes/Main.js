import axios from 'axios';
import React, {useState, useEffect} from 'react';
import MainPresenter from './Presenters/MainPresenter.js'

const Main = () => {
  const [boxOfficeData, setBoxOfficeData] = useState([]);

  const getBoxOffice = async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/post/boxOffice`)
    .then((response) => {
      setBoxOfficeData(response.data.boxOffice);
      console.log(response.data.boxOffice);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  useEffect(() => getBoxOffice(), []);

  return (
    <MainPresenter boxOfficeData={boxOfficeData}/>
  )
}

export default Main;