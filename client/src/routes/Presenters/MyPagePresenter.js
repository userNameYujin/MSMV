import React from 'react';
import styled from 'styled-components';
import store from '../../store';

const Wrapper = styled.div`
  padding-top: 180px; 
  
`;

const MainTitle = styled.div`
  text-align: center;
  width: 400px;
  padding: 20px 20px 10px 100px;
  font-size: 15px;
  font-weight: bold;
  background: red;
`;

/*
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
*/

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


const MyPagePresenter = ({takeNewNickname, submitNewNickname, takeOldPassword, takeNewPassword, submitNewPassword, takeWithdrawPassword, submitWithdraw}) => {
  const user = store.getState().user;
  
  return (
    <Wrapper>
      <div>
        <MainTitle><h1>마이페이지</h1></MainTitle>
        
        <NicknameButton>
        <p>현재 닉네임 : {user.nickname}</p>
        <p>닉네임 변경</p>
        <input onChange={takeNewNickname} placeholder="새 닉네임 입력"/>
        <button onClick={submitNewNickname}>변경</button>
        </NicknameButton>
        
        <NicknameButton>
        <p>비밀번호 변경</p>
        <input onChange={takeOldPassword} placeholder="현재 비밀번호 입력"/>
        <input onChange={takeNewPassword} placeholder="새 비밀번호 입력"/>
        <button onClick={submitNewPassword}>변경</button>
        </NicknameButton>

        <NicknameButton>
        <p>계정 탈퇴</p>
        <input onChange={takeWithdrawPassword} placeholder="현재 비밀번호 입력"/>
        <button onClick={submitWithdraw}><b>탈퇴</b></button>
        </NicknameButton>


      </div>
    </Wrapper>
  )
}

export default MyPagePresenter;