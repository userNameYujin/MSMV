import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { Button, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons"

const Header = styled.header`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  width: 100%;
`;

const Banner = styled(Link)`
  font-size: 2.5rem;
  letter-spacing:3px;
  color: #6b66ff;
  font-family: fantasy;
  
`;

const Menu = styled.div`
  width: 1200px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;

  padding-right: 1rem;
  padding-left: 1rem;
  
`;

const LoginJoinButton = styled(Link)`
  font-weight: 600;
  color: #6b66ff;
  border: 1px solid #6799ff;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  border-radius: 2px;
  text-decoration: none;
  transition: .2s all;

  &:hover {
      background: #6799ff;
      color: white;
  }
`;

const LogoutButton = styled.button`
  font-weight: 600;
  color: #6b66ff;
  border: 1px solid #6799ff;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  border-radius: 2px;
  text-decoration: none;
  transition: .2s all;

  &:hover {
      background: #6799ff;
      color: white;
  }
`;

const GradientBorder = styled.div`
    height: 5px;
    background: linear-gradient(to right, #6799ff, #6b66ff);
`;


const WhiteBackground = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    height: auto;
`;

const Spacer = styled.div`
    flex-grow: 1;
`;

const Spacer2 = styled.div`
    flex-grow: 0.01;
`;



const HeaderPresenter = ({user, LogoutClick}) => {


  return (
    <Header>
      <WhiteBackground>
      <Menu>
      <Banner to='/'>MSmV</Banner>
      <Spacer/> 
      
      <Spacer2/>
        {user ? (
          <LogoutButton onClick={LogoutClick}>Logout</LogoutButton>
        ) : (
          <>
            <LoginJoinButton to="Login">Login</LoginJoinButton>
            <Spacer2/>
            <LoginJoinButton to="Join">Join</LoginJoinButton>
            <Spacer2/>
            
          </>
        )}  <Tooltip title="마이페이지 가기!">
            <LoginJoinButton to="MyPage"><img src="https://beslow.co.kr/assets/img/mobile-float-mypage.png" width="25px"/></LoginJoinButton>
            </Tooltip>
            <Spacer2/>
            <Tooltip title="영화검색하러 가기!">
            <LoginJoinButton to="Search"><img  src="https://beslow.co.kr/assets/img/search.png" width="25px"/></LoginJoinButton>
            </Tooltip>

      </Menu>
      </WhiteBackground>
      <GradientBorder/>
    </Header>
  )
}

export default HeaderPresenter;