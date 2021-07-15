import React from 'react';
import store from '../../store';
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

const MyPagePresenter = ({takeNewNickname, submitNewNickname, takeOldPassword, takeNewPassword, submitNewPassword, takeWithdrawPassword, submitWithdraw}) => {
  const user = store.getState().user;
  
  return (
    <Wrapper>
      <div>
        <MainTitle><h1>마이페이지</h1></MainTitle>
        <SubTitle><h3>닉네임 재설정</h3></SubTitle>
        
        
        <NicknameButton>
        <p>현재 닉네임 : {user.nickname}</p>
        <p>닉네임 변경</p>
        <input onChange={takeNewNickname} placeholder="새 닉네임 입력"/>
        <br/>
        <button onClick={submitNewNickname}>변경</button>
        </NicknameButton>
        <br/>
        <br/>
        <NicknameButton>
        <p>비밀번호 변경</p>
        <input onChange={takeOldPassword} placeholder="현재 비밀번호 입력"/>
        <br/>
        <input onChange={takeNewPassword} placeholder="새 비밀번호 입력"/>
        <br/>
        <button onClick={submitNewPassword}>변경</button>
        </NicknameButton>
        <br/>
        <br/>
        <NicknameButton>
        <p>계정 탈퇴</p>
        <input onChange={takeWithdrawPassword} placeholder="현재 비밀번호 입력"/>
        <br/>
        <button onClick={submitWithdraw}><b>탈퇴</b></button>
        </NicknameButton>
        <br/>

      </div>
    </Wrapper>
  )
}

export default MyPagePresenter;