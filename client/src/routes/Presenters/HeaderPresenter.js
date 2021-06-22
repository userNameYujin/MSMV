import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Header = styled.header`
`;

const Banner = styled(Link)`
`;

const Menu = styled.div`
`;

const LogoutButton = styled.button`
`;

const StyledLink = styled(Link)`
  padding: 0px 100px;
`;

const HeaderPresenter = ({user, LogoutClick}) => {
  return (
    <Header>
      <Banner to='/'>MSMV</Banner>
      <Menu>
        {user ? (
          <LogoutButton onClick={LogoutClick}>Logout</LogoutButton>
        ) : (
          <>
            <StyledLink to="Login">Login</StyledLink>
            <StyledLink to="Join">Join</StyledLink>
          </>
        )}
      </Menu>
    </Header>
  )
}

export default HeaderPresenter;