import axios from 'axios';
import React, {useState} from 'react';
import store from "../store";
import MyPagePresenter from './Presenters/MyPagePresenter.js';

const MyPage = () => {
  const [newNickname, setNewNickname] = useState('');

  const takeNewNickname = (e) => {
    setNewNickname(e.target.value);
  }

  const submitNewNickname = async () => {
    const nickname = newNickname;
    const id = store.getState().user.id;
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/mypage/nickModify/${id}`, { nickname, id })
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

  return (
    <MyPagePresenter takeNewNickname={takeNewNickname} submitNewNickname={submitNewNickname} testNewNickname={testNewNickname}/>
  )
}

export default MyPage;