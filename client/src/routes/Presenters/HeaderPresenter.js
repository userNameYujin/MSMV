import React, {optionsState} from 'react';
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

const Input = styled.input`
`;

const HeaderPresenter = ({user, LogoutClick, SearchCritCheck, SearchClick}) => {
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
        <select name="SearchCrit" value={optionsState} onChange={SearchCritCheck}>
          <option value="title">제목</option>
          <option value="director">감독</option>
        </select>
        <Input placeholder="검색"/>
        <button onClick={SearchClick}>검색</button>
      </Menu>
    </Header>
  )
}

export default HeaderPresenter;