import React from 'react';
import styled from 'styled-components';

// 메인 페이지 공간
const MainPage = styled.div`
  min-width: 1000px;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'MaplestoryOTFBold';
`;

// 메인 페이지 타이틀
const Title = styled.div`
  margin: 20px 0px 30px 0px;
  font-size: 25px;
`;


const MainDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Post = styled.div`
  margin-right: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModeToggleButton = styled.button`
  width: 200px;
  height: 50px;
  font-size: 17px;
  font-family: 'MaplestoryOTFBold';
  background-color: white;
  border: 2px solid black;
  margin: 20px 0;
  cursor: pointer;
`;

const MainPresenter = () => {
  return (
    <MainPage>
      <MainDiv>
        Main Page
      </MainDiv>
    </MainPage>
  );
};

export default MainPresenter;