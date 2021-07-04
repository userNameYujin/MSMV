import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    padding-top: 60px; 
`;

const MyPagePresenter = ({takeNewNickname, submitNewNickname, testNewNickname}) => {
  return (
    <Wrapper>
      <div>
        <h1>mypage</h1>
        <img alt="mypage" src="https://beslow.co.kr/assets/img/mobile-float-mypage.png" width="50px"/>
        <h3>닉네임 재설정</h3>
        <input onChange={takeNewNickname} placeholder="새 닉네임"/>
        <button onClick={submitNewNickname}>설정</button>
        <button onClick={testNewNickname}>테스트용</button>
      </div>
    </Wrapper>
  )
}

export default MyPagePresenter;