import React from 'react';
import styled from 'styled-components';
import store from '../../store';
import Nav from 'react-bootstrap/Nav'
import '../../App.css';
import { Tab, Tabs, Col, Row } from 'react-bootstrap';
import moment from 'moment';

const Wrapper = styled.div`
  margin-left:100px;
  margin-right:100px;
  padding-top: 20px;
  padding-left: 10px;
  font-family: 'Nanum Gothic', sans-serif;
  // background: linear-gradient(135deg , #eaeaea, #c5cae9 )
`;

const MainTitle = styled.div`
  text-align: center;
  width: 400px;
  padding: 20px 10px 20px 10px;
  font-size: 15px;
  font-family: 'Nanum Gothic', sans-serif;
  font-weight: 700;
  background: ;
  
  margin-left: auto;
  margin-right: auto;

`;


const SubTitle = styled.div`
<<<<<<< HEAD
  background: ;
  width: 500px;
  padding-left: 80px;
=======
  // width: 500px;
  padding-left: 30px;
>>>>>>> 6be029514b5e0121130f849c1c60d2a810619d8b
  font-size: 25px;
  font-weight: bold;
`;

const LeftLayout = styled.div`
<<<<<<< HEAD
  margin: 50px 0px 0px 80px;
=======
  margin: 30px 0px 0px 50px;
>>>>>>> 6be029514b5e0121130f849c1c60d2a810619d8b
  background: ;
  font-size: 16px;
  background: ;
  width: 75%;
  height: 200px;
  color: black;
  font-weight:400;
`;

const SideBySide1 = styled.div`
<<<<<<< HEAD
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
=======
  // float: right;
  // width: 500px;
  height: 150px;
  margin-left:-20px;
  // background: ;
  // margin-top: -50px;
  // margin-right: 20px;
`;

const SideBySide2 = styled.div`
  // float: right;
  // width: 500px;
  margin-left :-20px;
  height: 150px;
  background: ;
  margin-top: 0;
>>>>>>> 6be029514b5e0121130f849c1c60d2a810619d8b
`;

const SideBySide3 = styled.div`
  float: left;
  width: 400px;
  height: 150px;
  background: ;
  margin: 10px 0px 0px 100px;
`;

const NicknameLayout = styled.div`
  padding: 75px 20px 20px 20px;
  height: 350px;
  width: 90%;
  
  font-weight: 600;
  
  background: ;
  border-radius: 3px;
  border-top: 2px solid gray;
  text-decoration: none;
  background: white;
  text-align: left;
  margin-left: 0;
  // margin-right: auto;
`;

const PasswordLayout = styled.div`
  padding: 72px 20px 20px 20px;
  height: 350px;
  width: 90%;
  
  font-weight: 600;
  
  // cursor: pointer;
  border-radius: 3px;
  border-top: 2px solid gray;
  text-decoration: none;
  background: white;
  text-align: left;
  margin-left: 0;
  // margin-right: auto;
  
`;

const MyReviewLayout = styled.div`
  padding: 72px 20px 20px 20px;
  height: auto;
  width: 90%;

  font-weight: 600;
  
  /* cursor: pointer; */
  border-radius: 3px;
  border-top: 2px solid gray;
  text-decoration: none;
  background: white;
  text-align: left;
  margin-left: 0;
  // margin-right: auto;
`;

<<<<<<< HEAD

const DeleteLayout = styled.div`\
=======
// const Table = styled.div`
//   border: 1px solid black;
//   border-radius:2px;
//   width: 85%;
//   height: auto;
//   padding: 5px 10px 5px 10px;
//   margin: 0 auto;
// `;

const Table = styled.div`
  border-bottom : 1px solid black;
  width: 85%
  height: auto;
  padding: 20px 10px 15px 10px;
  margin: 0;

`;
const Review = styled.div`
  padding-left:40px;
`;
const Rate = styled.div`
  font-size: 15px;
`;

const Info = styled.div`
  font-size: 15px;
`;

const Contents = styled.div`
  font-size: 15px;
`;

const Paging = styled.div`
  fonst-size: 12px;
  width: 150px;
  margin: 30px auto;
`;
const DeleteLayout = styled.div`
>>>>>>> 6be029514b5e0121130f849c1c60d2a810619d8b
  padding: 100px 20px 20px 20px;
  height: 400px;
  width: 90%;
  
  font-weight: 600;
<<<<<<< HEAD
  color: ;
  cursor: pointer;
=======
  color: #6B66FF;
  /* cursor: pointer;*/
>>>>>>> 6be029514b5e0121130f849c1c60d2a810619d8b
  border-radius: 3px;
  border-top: 2px solid gray;
  text-decoration: none;
  background: white;
  text-align: left;
  margin-left: 0;
  // margin-right: auto;

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
<<<<<<< HEAD
  font-size: 15px;
=======
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 16px;
>>>>>>> 6be029514b5e0121130f849c1c60d2a810619d8b
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

<<<<<<< HEAD
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
=======
const WarningButton = styled.button`
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 16px;
  font-weight: 600;
  width: 60px;
  height: auto;
  // color: #6B66FF;
  color:white;
  border: 1px solid #6B66FF;
  background-color: #6B66FF;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  border-radius: 3px;
  text-decoration: none;
  transition: .2s all;

  &:hover {
    background: #ff6b66;
    color: white;
  }
`;

const HJLayout = styled.div`
  padding: 75px 20px 20px 20px;
  height: 350px;
  width: 90%;
  
  font-weight: 600;
  
  background: ;
  border-radius: 3px;
  border-top: 2px solid gray;
  text-decoration: none;
  background: white;
  text-align: left;
  margin-left: 0;
  // margin-right: auto;
  
`;
const MyTab = styled.div`
    font-size: 20px;
`;
const AllThing = styled.div`
  background: linear-gradient(135deg , #eaeaea, #c5cae9 );
`;
const Pointword = styled.div`
  font-size:18px;
  font-weight:bold;
>>>>>>> 6be029514b5e0121130f849c1c60d2a810619d8b
`;

const MyPagePresenter = ({takeNewNickname, submitNewNickname, takeOldPassword, takeNewPassword, submitNewPassword, takeWithdrawPassword, submitWithdraw, myReviews}) => {
  const user = store.getState().user;
  
  return (
    <AllThing>
    <Wrapper>        
        <MainTitle><h1>마이페이지</h1></MainTitle>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <MyTab>
                  <Nav.Item>
                    <Nav.Link eventKey="first">회원정보 수정</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">내가 쓴 리뷰</Nav.Link>
                  </Nav.Item>
                </MyTab>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventkey="zero">
                  <HJLayout>

                  </HJLayout>
                </Tab.Pane>
                <Tab.Pane eventKey="first">
                  <NicknameLayout>
                    <SubTitle><p>프로필 수정</p></SubTitle>
                      <LeftLayout>
                        <Pointword><p>닉네임 변경</p></Pointword>
                        <p>현재 닉네임 : {user.nickname}</p>
                      <SideBySide1>
                        <AllInput input onChange={takeNewNickname} placeholder="새 닉네임 입력"></AllInput>
                        <AllButton button onClick={submitNewNickname}>변경</AllButton>
                      </SideBySide1>
                      </LeftLayout>
                    </NicknameLayout>
                    
                    <PasswordLayout>
                    <SubTitle><p>비밀번호 변경</p></SubTitle>
                      <LeftLayout>
                        {/* <p>비밀번호 변경</p> */}
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
                            <p>탈퇴할 경우 사용하고 계신 아이디({user.user_id})는 재사용 및 복구가 불가능합니다.</p>
                            <SideBySide3>
                              <AllInput input onChange={takeWithdrawPassword} placeholder="현재 비밀번호 입력"></AllInput>
                              <WarningButton button onClick={submitWithdraw}><b>탈퇴</b></WarningButton>
                            </SideBySide3>
                        </LeftLayout>
                      </DeleteLayout>

                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <MyReviewLayout>
                    <SubTitle><p>내가 쓴 리뷰</p></SubTitle>
                    
                    
                    {myReviews.map((review) => ( 
<<<<<<< HEAD
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
=======

                      <Review>
                        <Table key={review.review_id}>
>>>>>>> 6be029514b5e0121130f849c1c60d2a810619d8b
                        
                          <Info>
                          날짜 : {moment(review.created).format('MMMM Do YYYY, h:mm:ss a')}
                          </Info>
                          <Contents>
                            제목 : {review.movieTitle}<br/>
                            내용 : {review.contents}
                          </Contents>
                          
                          <Rate>
                            평점 : {review.rate}
                          </Rate>
                          
                        </Table>

                      </Review>
                      
                      ))}
                      
                   
                    <Paging></Paging>

                  
                  </MyReviewLayout>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
    </Wrapper>
    </AllThing>
  )
}

export default MyPagePresenter;