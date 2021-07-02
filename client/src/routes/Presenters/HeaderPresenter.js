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


const HeaderPresenter = ({user, LogoutClick, moveSearch}) => {
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
        {/* <select name="SearchCrit" value={optionsState} onChange={SearchCritCheck}>
          <option value="title">제목</option>
          <option value="director">감독</option>
        </select>
        <Input placeholder="검색"/>
        <button onClick={SearchClick}>검색</button> */}
        <img src="https://previews.123rf.com/images/tatianasun/tatianasun1612/tatianasun161200074/68936384-%EB%8F%8B%EB%B3%B4%EA%B8%B0-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B2%A1%ED%84%B0-%EB%8F%8B%EB%B3%B4%EA%B8%B0-%EB%98%90%EB%8A%94-%EB%B6%80%EB%B6%84-%ED%99%95%EB%8C%80-%EA%B8%B0%ED%98%B8-.jpg" alt="search" width="50px" onClick={moveSearch}/>
      </Menu>
    </Header>
  )
}

export default HeaderPresenter;