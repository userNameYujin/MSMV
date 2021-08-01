import React from 'react';
import styled from 'styled-components';
import store from '../../store';
import Nav from 'react-bootstrap/Nav'
import { Tab, Tabs, Col, Row } from 'react-bootstrap';

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
  padding-left: 80px;
  font-size: 25px;
  font-weight: bold;
  
`;

const LeftLayout = styled.div`
  margin: 50px 0px 0px 80px;
  background: ;
  font-size: 16px;
  background: ;
  width: 75%;
  height: 200px;
  color: black;
`;

const SideBySide1 = styled.div`
  float: right;
  width: 400px;
  height: 150px;
  background: ;
  margin-top: -45px;
  margin-right: 20px;
`;

const SideBySide2 = styled.div`
  float: right;
  width: 410px;
  height: 150px;
  background: ;
  margin-top: -45px
`;

const SideBySide3 = styled.div`
  float: left;
  width: 400px;
  height: 150px;
  background: ;
  margin: 10px 0px 0px 100px;
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


const DeleteLayout = styled.div`\
  padding: 100px 20px 20px 20px;
  height: 400px;
  width: 65%;
  
  font-weight: 600;
  color: ;
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
  height: 38px;
  margin: 0px 5px 5px 20px;
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
  font-size: 15px;
  font-weight: 600;
  width: 60px;
  height: 40px;
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

const Table = styled.div`
  border: 1px solid black;
  
`;

const Rate = styled.div`
  font-size: 15px;
  background: pink;
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

const MyPagePresenter = ({takeNewNickname, submitNewNickname, takeOldPassword, takeNewPassword, submitNewPassword, takeWithdrawPassword, submitWithdraw, myReviews}) => {
  const user = store.getState().user;
  
  return (
    <Wrapper>
      <div>          
        <MainTitle><h1>마이페이지</h1></MainTitle>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">회원정보 수정</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">내가 쓴 리뷰</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third"></Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
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

                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <MyReviewLayout>
                    <SubTitle><p>내가 쓴 리뷰</p></SubTitle>
                    
                    
                    {myReviews.map((review) => ( 
                      <Table key={review.review_id}>
                        
                        <Info>
                          <p>날짜 : {review.created}</p>
                        </Info>
                        <Contents>
                          내용 : {review.contents}
                        </Contents>
                        
                        <Rate>
                          평점 : {review.rate}
                        </Rate>
                        
                      </Table>
                      ))}
                      
                   
                    <Paging></Paging>

                  
                  </MyReviewLayout>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>


        
        
        

        
        


       


      </div>
    </Wrapper>
  )
}

export default MyPagePresenter;