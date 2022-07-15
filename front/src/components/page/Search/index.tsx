import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import Footer from "../../Footer";
import {
  LearningContainer,
  SearchContainer,
  SearchRowContainer,
  ResultContainer,
  CardContainer,
  VideoContainer,
  SearchBar,
  SearchButton,
  H1,
  AutoSearchContainer,
  AutoSearchWrap,
  AutoSearchData,
} from "./index.style";

import { searchCopyRights } from "../../copyRights/copyRights";
import ReactTooltip from "react-tooltip";

import * as Api from "../../../api";

interface VideoDataProps {
  _id: string;
  english: string;
  handVideo: string;
  mouthVideo?: string;
}

interface ImgDataProps {
  _id: string;
  word: string;
  english: string;
  cardImageURL: string;
}

const boxVariants = {
  hover: { scale: 1.3, rotateZ: "360deg" },
  tab: { borderRadius: "100px", scale: 1.2 },
  drag: { backgroundColor: "rgb(46,123,250)", transition: { duration: 2 } },
};

const Search = () => {
  const check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  const [searchWord, setSearchWord] = useState("");
  const [find, setFind] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const [searchedImage, setSearchedImage] = useState({
    src: "",
    alt: "",
  });

  const [videos, setVideos] = useState<VideoDataProps[]>([]);
  const [videoSrc, setVideoSrc] = useState<string[]>([]);

  const [isEmpty, setIsEmpty] = useState(true);
  const [isFirst, setIsFirst] = useState(true);

  const [wordPictures, setWordPictures] = useState<ImgDataProps[]>([]);

  const [searchAutoWord, setSearchAutoWord] = useState<string>("");
  const [searchAutoKey, setSearchAutoKey] = useState<ImgDataProps[]>([]);

  const [isClickedInList, setIsClickedInList] = useState(false);

  const searchData = (search: string | ImgDataProps) => {
    if (typeof search === "string") {
      return check_kor.test(search)
        ? wordPictures.filter((data) => data.word === search)
        : wordPictures.filter((data) => data.english === search.toLowerCase());
    } else {
      return check_kor.test(search.word)
        ? wordPictures.filter((data) => data.word === search.word)
        : wordPictures.filter((data) => data.english === search.english);
    }
  };

  const searchImg = (searchedData: any) => {
    if (searchedData.length > 0) {
      setSearchedImage({
        src: searchedData[0].cardImageURL,
        alt: searchedData[0].english,
      });
      setIsEmpty(false);
    } else {
      setSearchedImage({
        src: "",
        alt: "",
      });
      setIsEmpty(true);
    }
  };

  const searchVideo = (searchedData: any) => {
    if (searchedData.length > 0) {
      const filteredVideo = videos
        .filter((data) => {
          if (data.english === searchedData[0].english) {
            return data;
          }
        })
        .map((data) => {
          return data.handVideo;
        });
      setVideoSrc(filteredVideo);
    } else {
      setVideoSrc([]);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
    setSearchAutoWord(e.target.value);
    setIsClickedInList(false);
  };

  const handleOnClick = () => {
    setIsFirst(false);
    setIsClickedInList(true);

    const searchedData = searchData(searchAutoWord);

    searchImg(searchedData);
    searchVideo(searchedData);
  };

  const autoSearchOnClick = (search: ImgDataProps) => {
    setIsFirst(false);
    setIsClickedInList(true);

    if (check_kor.test(searchAutoWord)) {
      setSearchAutoWord(search.word);
    } else {
      setSearchAutoWord(search.english);
    }

    const searchedData = searchData(search);

    searchImg(searchedData);
    searchVideo(searchedData);
  };

  const getVideos = async () => {
    const res = await Api.get("hands");
    setVideos(res.data.slice(26));
  };

  const getWordPictures = async () => {
    const res = await Api.get("cards");
    setWordPictures(res.data);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleOnClick();
    }
  };

  interface WordSearchList {
    includes(data: string): boolean;
    word?: any;
    english?: any;
  }

  const updateData = async () => {
    const res = await Api.get("cards");
    const filteredData = res.data
      .filter((list: WordSearchList) => {
        return check_kor.test(searchAutoWord)
          ? list.word.includes(searchAutoWord) === true
          : list.english.includes(searchAutoWord) === true;
      })
      .slice(0, 7);
    setSearchAutoKey(filteredData);
  };

  useEffect(() => {
    setFind(true);
  }, [searchWord]);

  useEffect(() => {
    getVideos();
    getWordPictures();
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchAutoWord) updateData();
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [searchAutoWord]);

  return (
    <LearningContainer>
      <SearchContainer>
        <SearchRowContainer>
          <SearchBar
            type="text"
            placeholder="여기서 입력!"
            value={searchAutoWord}
            onChange={handleOnChange}
            onKeyDown={onKeyDown}
          />
          {!isClickedInList && searchAutoKey.length > 0 && searchAutoWord && (
            <AutoSearchContainer>
              <AutoSearchWrap>
                {searchAutoKey.map((search) => {
                  return (
                    <AutoSearchData
                      key={search.word}
                      onClick={() => autoSearchOnClick(search)}
                    >
                      {check_kor.test(searchAutoWord) ? (
                        <a style={{ textDecoration: "None", color: "black"}} href="#">{search.word}</a>
                      ) : (
                        <a style={{ textDecoration: "None", color: "black"}} href="#">{search.english}</a>
                      )}
                    </AutoSearchData>
                  );
                })}
              </AutoSearchWrap>
            </AutoSearchContainer>
          )}

          <SearchButton
            onClick={handleOnClick}
            data-tip="main-search"
            data-for="main-search"
          >
            검색!
          </SearchButton>
          <ReactTooltip id="main-search" place="bottom">
            <video autoPlay width="400" muted loop>
              <source
                src="http://sldict.korean.go.kr/multimedia/multimedia_files/convert/20160325/251010/MOV000262948_700X466.mp4"
                type="video/mp4"
              />
            </video>
            <p style={{ textAlign: "right" }}>출처: 국립국어원</p>
          </ReactTooltip>
        </SearchRowContainer>
      </SearchContainer>
      <ResultContainer>
        {isEmpty && isFirst && (
          <H1>
            공부했던 것을 찾아볼까요? <br /> 한글로, 영어로 함께 검색해 봐요.
          </H1>
        )}
        {isEmpty && !isFirst && <H1>검색 결과가 없습니다!</H1>}
        {!isEmpty && find && videoSrc.length >= 1 && (
          <>
            <CardContainer>
              <div ref={constraintsRef} style={{ width: "500px" }}>
                <motion.img
                  src={searchedImage.src}
                  alt={searchedImage.alt}
                  drag
                  variants={boxVariants}
                  whileHover="hover"
                  whileDrag="drag"
                  whileTap="tab"
                  dragElastic={0.5} /* force Elastic : 마우스에 탄성 */
                  dragConstraints={constraintsRef}
                  style={{
                    borderRadius: "30px",
                    maxWidth: "500px",
                    minWidth: "350px",
                  }}
                />
              </div>
            </CardContainer>
            <VideoContainer>
              <div style={{ maxWidth: "500px", minWidth: "500px" }}>
                <video
                  autoPlay
                  controls
                  width="500"
                  muted
                  loop
                  style={{ borderRadius: "5px" }}
                  key={videoSrc[0]}
                >
                  <source src={videoSrc[0]} type="video/mp4" />
                </video>
              </div>
            </VideoContainer>
          </>
        )}
      </ResultContainer>
      <Footer
        aLinks={searchCopyRights.aLinks}
        contents={searchCopyRights.contents}
      />
    </LearningContainer>
  );
};

export default Search;
