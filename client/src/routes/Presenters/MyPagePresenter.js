import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 180px; 
`;

const MainTitle = styled.div`
  
  font-size: 20px;
  font-weight: 700;
`;

const SubTitle = styled.div`
  
  font-size: 15px;
  font-weight: 700;
`;

const NicknameButton = styled.div`\
display: inline-block;
font-weight: 600;
color: red;
cursor: pointer;
border-radius: 3px;
text-decoration: none;

`;

const MyPagePresenter = ({takeNewNickname, submitNewNickname, testNewNickname}) => {
  return (
    <Wrapper>
      <div>
        <MainTitle><h1>마이페이지</h1></MainTitle>
        <SubTitle><h3>닉네임 재설정</h3></SubTitle>
        
        <img alt="mypage" src="https://beslow.co.kr/assets/img/mobile-float-mypage.png" width="50px"/>
        
        
        <NicknameButton>
        <input onChange={takeNewNickname} placeholder="새 닉네임"/>
        <button onClick={submitNewNickname}>설정</button>
        <button onClick={testNewNickname}>테스트용</button>
        </NicknameButton>
      </div>
    </Wrapper>
  )
}

export default MyPagePresenter;