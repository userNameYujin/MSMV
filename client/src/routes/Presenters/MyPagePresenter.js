import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 180px; 
  
`;

const MainTitle = styled.div`
  
  width: 400px;
  padding: 20px 20px 10px 100px;
  font-size: 15px;
  font-weight: bold;
`;

const SubTitle = styled.div`
  
  width: 400px;
  padding: 20px 20px 10px 200px;
  font-size: 15px;
  font-weight: bold;
`;

const MypageImg = styled.div`
  float: left;
  padding: 20px 10px 20px 300px;
  
`;

const NicknameButton = styled.div`\
padding: 30px 20px 20px 20px;
height: 90px;
float: left;
font-weight: 600;
color: #6B66FF;
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
        <MypageImg>
          <img alt="mypage" src="https://beslow.co.kr/assets/img/mobile-float-mypage.png" width="50px"/>
        </MypageImg>
        
        
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