import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import store from "../store";
import MyPagePresenter from './Presenters/MyPagePresenter.js';

const MyPage = () => {
  const [newNickname, setNewNickname] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [withdrawPassword, setWithdrawPassword] = useState('');
  const [myReviews, setMyReviews] = useState([]);

  const takeNewNickname = (e) => {
    setNewNickname(e.target.value);
  }

  const submitNewNickname = async () => {
    const nickname = newNickname;
    const id = store.getState().user.id;
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/mypage/nickname/${id}`, { nickname, id })
    .then((response) => {
      console.log(response);
      if (response.data.code === 400) {
        console.log("닉네임 중복");
        window.alert("400 : 해당 닉네임이 이미 존재합니다.");
      }
      else if (response.data.code === 200) {
        console.log("닉네임 변경 완료");
        window.alert("닉네임이 정상적으로 변경되었습니다.");
        //window.location.reload();
      }
    })
    .catch((error) => {
      window.alert(error);
    });
  }

  const testNewNickname = async () => {
    console.log(store.getState());
    //console.log(store.getState().user.nickname);
  }


  const takeNewPassword = async (e) => {
    setNewPassword(e.target.value);
  }
  const takeOldPassword = async (e) => {
    setOldPassword(e.target.value);
  }

  const submitNewPassword = async () => {
    const id = store.getState().user.id;
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/mypage/password`, { oldPassword, newPassword, id })
    .then((response) => {
        console.log("비밀번호 변경 완료");
        window.alert("비밀번호가 정상적으로 변경되었습니다.");
    })
    .catch((error) => {
      console.log(error.response.data);
      window.alert(error.response.data.message);
    });
  }

  const takeWithdrawPassword = async (e) => {
    setWithdrawPassword(e.target.value);
  }

  const history = useHistory();

  const submitWithdraw = async () => {
    const id = store.getState().user.id;
    const pw = withdrawPassword;
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/mypage/withdraw`, { id, pw })
    .then((response) => {
        console.log("탈퇴 완료");
        window.alert("탈퇴 완료");
        history.push({ pathname: '/' });
    })
    .catch((error) => {
      console.log(error.response.data);
      window.alert(error.response.data.message);
    });
  }

  const getMyReviews = async() => {
    const user_id = store.getState().user.id;
    console.log(user_id);
    await axios.get(`${process.env.REACT_APP_SERVER_URL}/mypage/myReview/${user_id}`, { withCredentials:true })
    .then((response) => {
      console.log(response);
      setMyReviews(response.data.result);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => getMyReviews(), []);

  return (
    <MyPagePresenter takeNewNickname={takeNewNickname} submitNewNickname={submitNewNickname} testNewNickname={testNewNickname} takeNewPassword={takeNewPassword} takeOldPassword={takeOldPassword} submitNewPassword={submitNewPassword} takeWithdrawPassword={takeWithdrawPassword} submitWithdraw={submitWithdraw} myReviews={myReviews}/>
  )
}

export default MyPage;