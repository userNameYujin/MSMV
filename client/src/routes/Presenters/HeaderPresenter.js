import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  width: 100%;
`;

const Banner = styled(Link)`
  font-size: 2rem;
  letter-spacing:2px;
  color: red;
  font-family: cursive;
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

const HeaderPresenter = ({user, LogoutClick}) => {
  return (
    <Header>
      <BlackBackground>
      <Menu>
      <Banner to='/'>GlaDos</Banner>
      <Spacer/>
        {user ? (
          <LogoutButton onClick={LogoutClick}>Logout</LogoutButton>
        ) : (
          <>
            <LoginJoinButton to="Login">Login</LoginJoinButton>
            <Spacer2/>
            <LoginJoinButton to="Join">Join</LoginJoinButton>
            
          </>
        )}
      </Menu>
      </BlackBackground>
      <GradientBorder/>
    </Header>
  )
}

export default HeaderPresenter;