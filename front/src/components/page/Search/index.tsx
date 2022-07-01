import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { learningCopyRights } from "../../copyRights/copyRights";
import Footer from "../../Footer";
import {
  LearningContainer,
  ContentsContainer,
  CardContainer,
  SearchBar,
  SearchButton,
} from "./index.style";
import CardTemplate from "../Learning/LearningTemplate/CardTemplate";
import ReactTooltip from "react-tooltip";
import { imgSrc } from "./wordData";

import * as Api from "../../../api";

interface VideoDataProps {
  _id: string;
  english: string;
  handVideo: string;
  mouthVideo?: string;
}

const Search = () => {
  const [searchWord, setSearchWord] = useState("");
  const [compareWord, setCompareWord] = useState("");
  const [find, setFind] = useState(false);

  const [searchedImage, setSearchedImage] = useState({
    src: "",
    alt: "",
  });

  const [videos, setVideos] = useState<VideoDataProps[]>([]);
  const [videoSrc, setVideoSrc] = useState<string[]>([]);

  // const [compareAlt, setCompareAlt] = useState<string[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleOnClick = () => {
    //이미지 찾기
    const tempImg = imgSrc.filter((img, index) => {
      if (searchWord === img.name) return img;
    });
    setSearchedImage({
      src: tempImg[0].src,
      alt: tempImg[0].alt,
    });

    const temp = imgSrc.filter((data) => {
      return data.name === searchWord;
    });

    const mapped = temp.map((data) => data.alt);
    //비디오 찾기
    const temp2 = videos
      .filter((data) => {
        if (data.english === mapped[0]) {
          return data;
        }
      })
      .map((data) => {
        return data.handVideo;
      });

    setVideoSrc(temp2);
    // setCompareAlt(temp);
  };

  // useEffect(() => {
  //   const temp2 = videos
  //     .filter((data) => {
  //       console.log("filterd", data.english, compareAlt[0]);
  //       if (data.english === compareAlt[0]) {
  //         return data;
  //       }
  //     })
  //     .map((data) => {
  //       console.log("data.handVideo", data.handVideo);
  //       return data.handVideo;
  //     });
  //   console.log("temp2", temp2);

  //   setVideoSrc(temp2);
  // }, [compareAlt]);

  const getVideos = async () => {
    const res = await Api.get("hands");
    setVideos(res.data.slice(26));
  };

  useEffect(() => {
    setFind(true);
  }, [searchWord]);

  useEffect(() => {
    console.log("video", videoSrc);
  }, [videoSrc]);

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <LearningContainer>
      <ContentsContainer>
        <SearchBar
          type="text"
          placeholder="찾아볼까요?"
          onChange={handleOnChange}
        />

        <SearchButton onClick={handleOnClick}>검색!</SearchButton>
        {searchWord && <></>}
        {find && videoSrc.length >= 1 && (
          <>
            <CardContainer>
              <CardTemplate src={searchedImage.src} alt={searchedImage.alt} />
            </CardContainer>
            <video
              autoPlay
              controls
              width="300"
              muted
              loop
              style={{ borderRadius: "5px" }}
              key={videoSrc[0]}
            >
              <source src={videoSrc[0]} type="video/mp4" />
            </video>
          </>
        )}
        {/* {!find && <h2>검색 결과가 없습니다!</h2>} */}
        <Footer
          aLinks={learningCopyRights.aLinks}
          contents={learningCopyRights.contents}
        />
      </ContentsContainer>
    </LearningContainer>
  );
};

export default Search;
