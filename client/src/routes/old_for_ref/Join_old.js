import axios from 'axios';
import React, { useState } from 'react';
import store from '../store';
import { useHistory } from 'react-router';
import JoinPresenter from './JoinPresenter';

const Join = () => {
  const [id, setId] = useState();
  const [nickname, setNickname] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const props = { id, nickname, password, passwordCheck };
  const history = useHistory();

  const onChange = (e) => {
    const elementId = e.target.id;
    const { value } = e.target;
    if (elementId === 'id') setId(value);
    else if (elementId === 'password') setPassword(value);
    else if (elementId === 'passwordCheck') setPasswordCheck(value);
    else if (elementId === 'nickname') setNickname(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let errcode = 0;
    //비밀번호 일치 여부 확인
    if (!isPasswordSame()) return window.alert('비밀번호가 서로 같지 않습니다.');

    //id 중복확인
    errcode = await isIdAvailable();
    switch (errcode) { 
      case 200 : break;
      case 400 : return window.alert('이미 사용중인 아이디입니다.');
      default : return window.alert('아이디: 오류가 발생하였습니다.');
    }

    //nickname 중복확인
    errcode = await (isNicknameAvailable());
    switch (errcode) { 
      case (200) : break;
      case (400) : return window.alert('이미 사용중인 닉네임입니다.');
      default : return window.alert('닉네임: 오류가 발생하였습니다.');
    }

    //회원가입 요청
    await requestJoin();
  };

  const isPasswordSame = () => {
    return password === passwordCheck;
  };

  const isIdAvailable = async () => {
    let errcode;
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/join/id`, { id })
      .then((response) => {
        // 정상
        if (response.data.code === 200)
          errcode = 200;
      })
      .catch((err) => {
        // 중복
        if (err.response.data.code === 400)
          errcode = 400;
        else
          errcode = 0;
      });
      return errcode;
  };

  const isNicknameAvailable = async () => {
    let errcode;
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/join/nick`, { nickname })
      .then((response) => {
        // 정상
        if (response.data.code === 200)
          errcode = 200;
      })
      .catch((err) => {
        // 중복
        if (err.response.data.code === 400)
          errcode = 400;
        //오류
        else 
          errcode = 0;
      });
      return errcode;
  };

  const requestJoin = async () => {
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/join`, { id, password, nickname })
      .then(async (response) => {
        console.log("requestJoin"+response);
        await store.dispatch({ type: 'LOGIN', user: response.data.dataValues });
        console.log(store);
        window.alert('정상적으로 회원가입 되었습니다!');
        history.push({ pathname: '/' });
      })
      .catch((err) => window.alert('에러가 발생하였습니다!'));
  };

  return <JoinPresenter onChange={onChange} onSubmit={onSubmit} {...props} />;
};

export default Join;