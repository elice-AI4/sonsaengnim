import styled from "styled-components";
import searchPage from "../../../src_assets/search/searchPage.jpg";

export const LearningContainer = styled.div`
  position: relative;
  background-image: url(${searchPage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100vw;
  min-height: 100vh;
  min-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const SearchBar = styled.input`
  display: flex;
  font-size: 40px;
  padding: 10px;
  margin: 10px;
  background: white;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: plaevioletred;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 2rem;
  text-decoration: none;
  color: white;
  width: 23rem;
  height: 6rem;
  background-color: rgb(70, 180, 180);
  font-size: 3rem;
  font-weight: 600;
  border-radius: 10px;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(10rem);
  flex: 0.4;
  z-index: 2;
  padding-bottom: 50px;
`;

export const ResultContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0.6;
  width: 100vw;
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.4;
  margin: 3rem;
`;

export const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.4;
  margin: 3rem;
`;

export const H1 = styled.h1`
  margin-bottom: 1rem;
  justify-content: center;
  align-items: center;
`;

export const AutoSearchContainer = styled.div`
  z-index: -1;
  height: 55vh;
  width: 438px;
  background-color: white;
  position: absolute;
  transform: translateY(24rem);
  left: 9px;
  padding-top: 55px;
`;

export const AutoSearchWrap = styled.ul`
  list-style: none;
`;

export const AutoSearchData = styled.li`
  padding: 10px 8px;
  width: 100%;
  font-size: 30px;
  &:hover {
    background-color: #edf5f5;
    cursor: pointer;
  }
  position: relative;
  img {
    position: absolute;
    right: 5px;
    width: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const SearchRowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  bottom: 30px;
`;
