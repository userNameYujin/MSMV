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
  color: red;
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
  color: red;
  border: 1px solid red;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  border-radius: 2px;
  text-decoration: none;
  transition: .2s all;

  &:hover {
      background: $red;
      color: white;
  }
`;

const LogoutButton = styled.button`
  font-weight: 600;
  color: red;
  border: 1px solid red;
  padding: 0.5rem;
  padding-bottom: 0.4rem;
  cursor: pointer;
  border-radius: 2px;
  text-decoration: none;
  transition: .2s all;

  &:hover {
      background: $red;
      color: white;
  }
`;

const GradientBorder = styled.div`
    height: 5px;
    background: linear-gradient(to right, white, red);
`;


const BlackBackground = styled.div`
    background: black;
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

const SearchLink = styled(Link)`
  color: red;
  text-decoration: none;
  font-size: 13px;
  &:hover {
    color: white;
}
`;


const MenuButton = styled(Button)`
    cursor: pointer;
    background-color : red;
    `;

const HeaderPresenter = ({user, LogoutClick}) => {


  return (
    <Header>
      <BlackBackground>
      <Menu>
      <Banner to='/'>MSmV</Banner>
      <Spacer/>

      <SearchLink to = "/search">영화검색하러 가기!</SearchLink>
      
            <Tooltip title="영화검색하러 가기!">
                <MenuButton to ="Search" shape="circle" icon={<SearchOutlined />} ></MenuButton>
            </Tooltip>   

      <Spacer2/>
        {user ? (
          <>
            <LogoutButton onClick={LogoutClick}>Logout</LogoutButton>
            <LoginJoinButton to="MyPage">[MyPageImage]</LoginJoinButton>
          </>
        ) : (
          <>
            <LoginJoinButton to="Login">Login</LoginJoinButton>
            <Spacer2/>
            <LoginJoinButton to="Join">Join</LoginJoinButton>
            <Spacer2/>
            
          </>
        )}
            
      </Menu>
      </BlackBackground>
      <GradientBorder/>
    </Header>
  )
}

export default HeaderPresenter;