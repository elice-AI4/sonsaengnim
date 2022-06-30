# 영어 알파벳 지화 학습 사이트, 손생님🤙

## 1. 서비스 명

### 1) 프로젝트 주제

Hand pose estimation(Mediapipe)을 통한 영어 알파벳 지화 학습 사이트

### 2) 유저에게 보이는 웹 서비스 타이틀 및 한 줄 소개

**손생님**🤙

영어 알파벳을 배우고 싶어하는 초등학생 청각장애인이 웹에서 바로 지화를 학습하고 맞는지 확인할 수 있는 실시간 인터렉티브 학습 사이트

### 3) 팀 구성원의 전체 이름과 역할

| 역할 | 이름           |
| ---- | -------------- |
| FE   | 박보선, 박정훈 |
| BE   | 김동현, 김유진 |
| AI   | 김채정, 유혜선 |

## 2. 서비스 설명

### 1) 기획 의도

#### 조사할 문제, 조사할 문제가 흥미로운 이유

청각장애 아동은, 듣고 발화하는 과정을 통해 언어를 재구성하는 건청 아동과는 달리,
청력의 손실로 인해 언어 습득의 선천적 메커니즘이 작용될 수 없다.
따라서 청각장애 아동의 언어능력 향상을 위해 웹 기반 언어학습 시스템은
이들의 언어학습 특성에 적합하게 구성되어야 한다.  
출처: 금경애, 권오준, 김태석(2004). 청각장애 아동의 언어학습 특성을 반영한 웹 기반 언어학습 시스템의 구현,
컴퓨터교육학회논문지.

#### 어떤 사용자의, 어떤 문제를 해결하는지

청각장애인들은 시각으로 정보를 습득하고 학습해야 하기 때문에
청각 장애인들을 위한 효과적인 영어 교육방법과 내용이 연구 개발되어야 한다는 것에 대해서
많이 인식하고 있지만, 획기적인 교육 방법은 많이 제시되고 있지 않다.

[출처](https://www.krm.or.kr/krmts/search/detailview/research.html?dbGubun=SD&m201_id=10048480): 이근민(2013). 스마트폰을 활용한 청각장애인의 영어 학습 보조도구 설계 및 적용 연구, 일반공동연구지원사업.

#### 프로젝트가 제공하는 기대 효과와 활용 방안

인터렉티브한 방식을 통해 청각 장애인의 영어 알파벳 지문자 교육을 돕는다.

![image](/uploads/d018f568bd383edfb72f1175471d5a0f/스크린샷_2022-06-04_오후_5.55.20.png)
(프로토타입 화면)

- 주 사용자: 영어 알파벳 학습을 희망하는 청각장애인(아동 및 초등생)
- 서브 사용자: 영어 알파벳 지화를 궁금해 하는 청인

### 3. 사용된 데이터셋과 기술스택

#### 1) 어떤 데이터셋을 어떻게 전처리하고 사용할것인지

- 현재 지화의 경우 직접 학습시켜 대부분의 알파벳이 인식되는 상황이고, 추가적으로는 직접 촬영하여 학습시킬 예정입니다.

- 저작권 문제를 고려하여 학습 후 보여주는 영단어 수화 영상과 발음 입모양 영상은 직접 촬영할 예정입니다.

<유사한 서비스(레퍼런스)>

[AI 수화번역기 프로젝트 기술블로그1](https://eonhwa-theme.tistory.com/45?category=898021)

[AI 지화번역기 프로젝트 기술블로그2](https://developeralice.tistory.com/12)

[청각장애인의 수어 교육을 위한 MediaPipe 활용 수어 학습 보조 시스템 개발](https://www.koreascience.or.kr/article/JAKO202105254874193.pdf)

#### 2) 어떤 방법, 라이브러리나 알고리즘을 사용할것인지

| 파트                                                                                                                                                                                                                                                                                                                                                                                                                                            | 기술                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Team** :love_you_gesture:                                                                                                                                                                                                                                                                                                                                                                                                                     | ![image]({https://img.shields.io/badge/GitLab-330F63?style=for-the-badge&logo=gitlab&logoColor=white}), ![image]({https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white}), ![image]({https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white}), ![image]({https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white}), SpreadSheet                                                                                                                                   |
| **FE** :ok_hand:                                                                                                                                                                                                                                                                                                                                                                                                                                | ![image]({https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB}), ![image]({https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white}), ![image]({https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white}), ![image]({https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white}), ![image]({https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white}), jotai |
| **BE** :raised_back_of_hand:                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ![image]({https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white}), ![image]({https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white}), ![image]({https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white}), ![image]({https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white}) |
| **AI** :fingers_crossed:                                                                                                                                                                                                                                                                                                                                                                                                                        | ![image]({https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=TensorFlow&logoColor=white}), ![image]({https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue})                                                                                                                                                                                                                                                                                                                                                           |
| , ![image]({https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white}), ![image]({https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white}), ![image]({https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white}), mediapipe\*, LSTM                                                                                                |

Hand pose estimation: [google의 mediapipe](https://google.github.io/mediapipe/solutions/hands#python-solution-api)

classfication: k-nearest-neighbor algorithm

✔︎ 실시간 웹캠 영상을 바로 분석하고 결과를 전달하기 위해서 프론트단에서 인공지능 모델을 두어 딜레이를 최소화시킬 계획입니다.

#### 3) 이 프로젝트의 맥락과 배경이 유사한 인공지능 기반 서비스의 활용 사례 및 참고 논문

- 황건우, 소효정(2016). 청각장애 아동을 위한 한글교육 모바일 앱 개발, 한국보완대체의사소통학회.
- 박정민, 김영운, 박찬정(2020). 청각장애인의 실시간 한글 지화 번역을 위한 실시간 영상과 데이터 분석, 한국컴퓨터교육학회

- 한솔이, 김세아, 황경호(2017). 형태소 분석 기반 전자책 수화 번역 프로그램, 한국정보통신학회논문지.

- 허명진(2010). 청각장애 아동의 언어습득 경로 분석을 통한 효율적인 언어지도 방안, 신진연구자지원사업
- 금경애, 권오준, 김태석(2004). 청각장애 아동의 언어학습 특성을 반영한 웹 기반 언어학습 시스템의 구현

### 4. 웹 서비스의 최종적인 메인기능과 서브기능 설명

메인 기능: 영어 초기 학습자를 위한 알파벳 학습(일반 초등생 수준)

1. 각 알파벳에 대한 지화 이미지를 보여줍니다.
2. 사용자가 학습한 알파벳에 대해 웹캡으로 지화를 나타내면 해당 손짓이 올바른 알파벳인지 알려줍니다.

(인공지능 부분 상세 설명: 알파벳과 지화 이미지를 학습시킨다.
웹캠 캡쳐로 입력받은 지화가 어느 알파벳에 가장 가까운지 예측한다.)

서브 기능:

1. 영어 단어 사전: 기초 영어 단어 수화 화면 및 이미지, 검색 기능 포함
2. 영어 단어 퀴즈 ex. 화면에 특정 단어(cat), 웹캠으로 지화 입력 시 점수 획득, 점수 공유 기능

### 5. 프로젝트 구성

#### 1) 와이어프레임 및 스토리보드

[5팀 피그마 링크](https://www.figma.com/file/DmshTcF6FuWzM2p4qGlqvS/5%ED%8C%80-%3A-5AI-R?node-id=0%3A1)
