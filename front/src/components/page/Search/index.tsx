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

  const [videos, setVideos] = useState<VideoDataProps[]>([]);

  const [videoSrc, setVideoSrc] = useState<string[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleOnClick = () => {
    setCompareWord(searchWord);

    const compareAlt = imgSrc
      .filter((data) => {
        if (data.name === compareWord) {
          return data;
        }
      })
      .map((data) => data.alt);
    setVideoSrc(
      videos
        .filter((data) => {
          if (data.english === compareAlt[0]) {
            return data;
          }
        })
        .map((data) => {
          console.log("data.handVideo", data.handVideo);
          return data.handVideo;
        })
    );
  };

  const getVideos = async () => {
    const res = await Api.get("hands");
    setVideos(res.data.slice(26));
  };

  useEffect(() => {
    setFind(true);
    console.log("검색!", compareWord);
  }, [searchWord]);

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
        {find && (
          <>
            <CardContainer>
              {imgSrc
                .filter((img, index) => {
                  if (compareWord === img.name) return img;
                })
                .map((img, index) => {
                  console.log("엥", videoSrc);
                  return (
                    <CardTemplate
                      src={img.src}
                      alt={img.alt}
                      key={`img ${index}`}
                    />
                  );
                })}
            </CardContainer>
            <video
              autoPlay
              width="300"
              muted
              loop
              style={{ borderRadius: "5px" }}
            >
              <source src={videoSrc && videoSrc[0]} type="video/mp4" />
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
