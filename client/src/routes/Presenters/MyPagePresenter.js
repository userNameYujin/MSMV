import React from 'react';
import styled from 'styled-components';
import store from '../../store';

const Wrapper = styled.div`
  padding-top: 180px; 
  background: ;
  background: linear-gradient(135deg , ivory, #c5cae9 )
`;

const MainTitle = styled.div`
  text-align: center;
  width: 400px;
  padding: 20px 10px 20px 10px;
  font-size: 15px;
  font-weight: bold;
  background: ;
  
  margin-left: auto;
  margin-right: auto;

`;


const SubTitle = styled.div`
  background: ;
  width: 500px;
  padding-left: 200px;
  font-size: 25px;
  font-weight: bold;
  
`;

const LeftLayout = styled.div`
  margin: 50px 0px 0px 270px;
  background: ;
  font-size: 16px;
  background: ;
  width: 65%;
  height: 200px;
  color: black;
`;

const SideBySide1 = styled.div`
  float: right;
  width: 500px;
  height: 150px;
  background: ;
  margin-top: -50px;
  margin-right: 20px;
`;

const SideBySide2 = styled.div`
  float: right;
  width: 500px;
  height: 150px;
  background: ;
  margin-top: -50px
`;

const SideBySide3 = styled.div`
  float: left;
  width: 500px;
  height: 150px;
  background: ;
  margin-left: -20px;
`;

const NicknameLayout = styled.div`\
  padding: 75px 20px 20px 20px;
  height: 400px;
  width: 65%;
  
  font-weight: 600;
  
  background: ;
  border-radius: 3px;
  border-top: 2px solid gray;
  text-decoration: none;
  background: white;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
`;

const PasswordLayout = styled.div`\
  padding: 72px 20px 20px 20px;
  height: 400px;
  width: 65%;
  
  font-weight: 600;
  
  cursor: pointer;
  border-radius: 3px;
  border-top: 2px solid gray;
  text-decoration: none;
  background: white;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  
`;

const MyReviewLayout = styled.div`
  padding: 72px 20px 20px 20px;
  height: 500px;
  width: 65%;

  font-weight: 600;
  
  cursor: pointer;
  border-radius: 3px;
  border-top: 2px solid gray;
  text-decoration: none;
  background: white;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
`;

const Table = styled.div`
  border: 1px solid black;
  width: 65%;
  height: auto;
  padding: 5px 10px 5px 10px;
  margin: 0 auto;
`;

const Rate = styled.div`
  font-size: 15px;
`;

const Info = styled.div`
  font-size: 12px;
`;

const Contents = styled.div`
  font-size: 12px;
`;

const Paging = styled.div`
  fonst-size: 12px;
  width: 150px;
  margin: 30px auto;
`;
const DeleteLayout = styled.div`\
  padding: 100px 20px 20px 20px;
  height: 400px;
  width: 65%;
  
  font-weight: 600;
  color: #6B66FF;
  cursor: pointer;
  border-radius: 3px;
  border-top: 2px solid gray;
  text-decoration: none;
  background: white;
  text-align: left;
  margin-left: auto;
  margin-right: auto;

`;

const AllInput = styled.input`

  font-size: 15px;
  box-sizing: border-box;
  width: 260px;
  height: 40px;
  margin: 0px 5px 0px 20px;
  border: 1px solid black;
  border-radius: 3px;
  transition: border 0.1s ease-in-out;
  outline: none;
  &:hover,
  &:focus {
    border: 2px solid #6B66FF;
  }
`;

const AllButton = styled.button`
  font-size: 16px;
  font-weight: 600;
  width: 60px;
  height: auto;
  color: #6B66FF;
  border: 1px solid #6B66FF;
  background-color: lightgray;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  border-radius: 3px;
  text-decoration: none;
  transition: .2s all;

  &:hover {
    background: #6B66FF;
    color: white;
  }
`;
const MyPagePresenter = ({takeNewNickname, submitNewNickname, takeOldPassword, takeNewPassword, submitNewPassword, takeWithdrawPassword, submitWithdraw}) => {
  const user = store.getState().user;
  
  return (
    <Wrapper>
      <div>
        <MainTitle><h1>마이페이지</h1></MainTitle>
        
        
        <NicknameLayout>
        <SubTitle><p>프로필 수정</p></SubTitle>
          <LeftLayout>
            <p>현재 닉네임 : {user.nickname}</p>
            <p>닉네임 변경</p>
          <SideBySide1>
            <AllInput input onChange={takeNewNickname} placeholder="새 닉네임 입력"></AllInput>
            <AllButton button onClick={submitNewNickname}>변경</AllButton>
          </SideBySide1>
          </LeftLayout>
        </NicknameLayout>
        
        <PasswordLayout>
        <SubTitle><p>회원정보 수정</p></SubTitle>
          <LeftLayout>
            <p>비밀번호 변경</p>
          <SideBySide2>
            <AllInput input onChange={takeOldPassword} placeholder="현재 비밀번호 입력"></AllInput><br/>
            <AllInput input onChange={takeNewPassword} placeholder="새 비밀번호 입력"></AllInput>
            <AllButton button onClick={submitNewPassword}>변경</AllButton>
          </SideBySide2>
          </LeftLayout>
        </PasswordLayout>

        <MyReviewLayout>
          <SubTitle><p>내가 쓴 리뷰</p></SubTitle>
          <Table>
            <Rate>분노의질주 &nbsp; ★★★★★</Rate>
            <Info><p> {user.nickname} &nbsp; | &nbsp; 2021.07.28 </p></Info>
            <Contents>저는 아주 재미있게 봤습니다!</Contents>
          </Table>
          <Table>
            <Rate>크루엘라 &nbsp; ★★★★★</Rate>
            <Info><p> {user.nickname} &nbsp; | &nbsp; 2021.07.28 </p></Info>
            <Contents>저는 아주 재미있게 봤습니다!</Contents>
          </Table>
          <Table>
            <Rate>루카 &nbsp; ★★★★★</Rate>
            <Info><p> {user.nickname} &nbsp; | &nbsp; 2021.07.28 </p></Info>
            <Contents>저는 아주 재미있게 봤습니다!</Contents>
          </Table>
          <Paging>◀ &nbsp; 1 &nbsp; 2 &nbsp; 3 &nbsp; 4 &nbsp; 5 &nbsp; ▶</Paging>

         
        </MyReviewLayout>
        

        <DeleteLayout>
        <SubTitle><p>계정 탈퇴</p></SubTitle>
          <LeftLayout>
              <p>탈퇴할 경우 사용하고 계신 아이디({user.id})는 재사용 및 복구가 불가능합니다.</p>
              <SideBySide3>
                <AllInput input onChange={takeWithdrawPassword} placeholder="현재 비밀번호 입력"></AllInput>
                <AllButton button onClick={submitWithdraw}><b>탈퇴</b></AllButton>
              </SideBySide3>
          </LeftLayout>
        </DeleteLayout>
       


      </div>
    </Wrapper>
  )
}

export default MyPagePresenter;