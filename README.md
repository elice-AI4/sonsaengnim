# 영어 알파벳 수화 학습 사이트, 손생님🤙

![바운스손생님](https://user-images.githubusercontent.com/92101831/177501364-48f3f720-466f-44f0-a1e2-20fdfa7d557e.gif)

> 배포 도메인: http://kdt-ai4-team05.elicecoding.com/

## 0. 서비스 실행

```
git clone https://kdt-gitlab.elice.io/ai_track/class_04/ai_project/team5/final-project.git

cd final-project
```

- **Front**

```
cd front
yarn install
yarn start
```

- **Back**

```
cd back
yarn install
yarn start
```

- **AI**

```
cd AI/model
pip install -r requirement.txt
python app.py
```

## 1. 프로젝트 소개

---

### 1-1) 프로젝트 주제

Hand pose estimation을 통한 영어 알파벳 수화 학습 사이트

### 1-2) 서비스 개요 및 배경

> 청각장애 아동은, 듣고 발화하는 과정을 통해 언어를 재구성하는 건청 아동과는 달리,
    청력의 손실로 인해 언어 습득의 선천적 메커니즘이 작용될 수 없다.
    따라서 청각장애 아동의 언어능력 향상을 위해 웹 기반 언어학습 시스템은
    이들의 언어학습 특성에 적합하게 구성되어야 한다.
    <br>
    <br>
    [출처](https://scienceon.kisti.re.kr/srch/selectPORSrchArticle.do?cn=JAKO200426650738342&dbt=NART): 금경애, 권오준, 김태석(2004). 청각장애 아동의 언어학습 특성을 반영한 웹 기반 언어학습 시스템의 구현,
    컴퓨터교육학회논문지.

> 청각장애인들은 시각으로 정보를 습득하고 학습해야 하기 때문에
    청각 장애인들을 위한 효과적인 영어 교육방법과 내용이 연구 개발되어야 한다는 것에 대해서
    많이 인식하고 있지만, 획기적인 교육 방법은 많이 제시되고 있지 않다.
    <br>
    <br>
    [출처](https://www.krm.or.kr/krmts/search/detailview/research.html?dbGubun=SD&m201_id=10048480): 이근민(2013). 스마트폰을 활용한 청각장애인의 영어 학습 보조도구 설계 및 적용 연구, 일반공동연구지원사업.

### 1-3) 서비스 목표

영어 알파벳을 배우고 싶어하는 초등학생 청각장애인이 웹에서 바로 수화를 학습하고 맞는지 확인할 수 있다.

- 주 사용자: 영어 알파벳 학습을 희망하는 청각장애인(아동 및 초등생)
- 서브 사용자: 영어 알파벳 수어를 궁금해 하는 청인

## 2. 서비스 기능 소개

---

### 2-1) 메인 기능

- 알파벳 지화&영어 단어 학습
  - 26개의 알파벳 지화&21개의 영어 단어 영상 재생
  - 영상을 시청한 뒤 웹캠을 보면서 배운 것을 그대로 따라하고 제출
  - 해당 영상이 올바른 지화인지 검사하여 결과 반환
- 퀴즈
  - 앞서 학습한 21개 영어 단어 랜덤 등장
  - 제한 시간 동안 10개 문제
  - 맞힌 문제를 점수로 변환하여 순위표 등극

![alphabet_word_hover](https://user-images.githubusercontent.com/92101831/177501548-6d575427-9dc6-4b1a-94ba-3d0458db4d76.gif)

### 2-2) 서브 기능

- 영유아, 초등생 그리고 청각장애인을 타겟팅한 UI

  - 다양한 색감과 둥근 디자인으로 사용자 친화적인 UI 구성
  - 학습 직전 페이지, 학습 완료 모달창 등 애니메이션 효과 부여
  - 핵심 단어에 대한 수어를 확인할 수 있도록 tooltip 추가

![card_flip](https://user-images.githubusercontent.com/92101831/177501597-5cf4d2ba-6de6-4e8c-a5b4-e5b61a8a7274.gif)

![tootip_hover](/uploads/7b221d1acfae0888933f4bf29f984494/tootip_hover.gif)

- 회원가입
  - 회원가입 사용자는 포인트 적립 가능
  - 매 학습 성공 시, 획득한 퀴즈 점수마다 포인트 적립
  - (예정) 적립된 포인트로 청각장애인식 개선 캠페인 굿즈 구매

> 참고: 수화는 일반적으로 청각장애인의 언어를 의미하고, 수화에 존재하지 않는 고유명사와 문자를 표현하기 위해 나타내는 것을 지화라고 합니다.

### 2-3) 관련 문서

- 와이어프레임
  [5팀 피그마 링크](https://www.figma.com/file/DmshTcF6FuWzM2p4qGlqvS/5%ED%8C%80-%3A-5AI-R?node-id=0%3A1)

### 2-4) 이 프로젝트의 맥락과 배경이 유사한 인공지능 기반 서비스의 활용 사례 및 참고 논문

- 황건우, 소효정(2016). 청각장애 아동을 위한 한글교육 모바일 앱 개발, 한국보완대체의사소통학회.

- 박정민, 김영운, 박찬정(2020). 청각장애인의 실시간 한글 지화 번역을 위한 실시간 영상과 데이터 분석, 한국컴퓨터교육학회

- 한솔이, 김세아, 황경호(2017). 형태소 분석 기반 전자책 수화 번역 프로그램, 한국정보통신학회논문지.

- 허명진(2010). 청각장애 아동의 언어습득 경로 분석을 통한 효율적인 언어지도 방안, 신진연구자지원사업.

## 3. 사용된 데이터셋과 기술스택

---

### 3-1) 어떤 데이터셋을 어떻게 전처리하고 사용할것인지

- 저작권 문제를 고려하여 학습 전후 보여주는 영단어 수화 영상과 발음 입모양 영상은 직접 촬영했습니다.

- 인공지능 모델 학습을 위한 수화 및 지화 데이터는 모든 팀원들과 함께 촬영을 했고, 각 클래스마다 총 30프레임인 1초짜리 영상 200개를 데이터셋으로 구축했습니다.

### 3-2) 어떤 방법, 라이브러리나 알고리즘을 사용할것인지

| 파트                         | 기술                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Team** :metal:             | ![image](https://img.shields.io/badge/GitLab-330F63?style=for-the-badge&logo=gitlab&logoColor=white) ![image](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white) ![image](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white) ![image](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white) ![spreadsheet](https://user-images.githubusercontent.com/92101831/177503148-4ad4949f-0c05-49ed-a238-2498025ddf6c.png)                                                                                                                                                                                                                                                                                                                                                                  |
| **FE** :ok_hand:             | ![image](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![image](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![image](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white) ![image](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white) ![JOTAI](https://user-images.githubusercontent.com/92101831/177503065-dcde6f62-2f42-4c6e-9eb4-8679870dc486.png) ![mediapipe](https://user-images.githubusercontent.com/92101831/177503205-68d3c1fa-0ee8-4262-94c1-2487a8bb28d5.png)\* |
| **BE** :raised_back_of_hand: | ![image](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![image](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white) ![image](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) ![image](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)                                                                                                                                                                                                                                                               |
| **AI** :fingers_crossed:     | ![image](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat-square&logo=TensorFlow&logoColor=white) ![image](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue) ![image](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white) ![image](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white) ![image](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white) ![mediapipe](https://user-images.githubusercontent.com/92101831/177503205-68d3c1fa-0ee8-4262-94c1-2487a8bb28d5.png)\* LSTM, ![gunicorn](https://user-images.githubusercontent.com/92101831/177503109-752adbf6-f218-4bc6-a066-175d9428900a.png)                                                                                                                          |

> mediapipe는 구글의 머신러닝 오픈소스 프레임워크로, face, hand, pose 등 여러 인식과 관련된 작업을 처리할 수 있습니다. 수화를 인식할 수 있는 서비스를 만들기 위해 손의 움직임을 탐지하는 부분은 mediapipe를 활용했습니다. 해당 움직임이 맞는 수화인지 인식하는 부분은 프로젝트 중 인공지능 모델로 구축하였습니다. <br> [참고]([google의 mediapipe](https://google.github.io/mediapipe/solutions/hands#python-solution-api) )

![기술스택](https://user-images.githubusercontent.com/92101831/177501646-e277bca2-b803-4556-9cf4-3c2a4aba2d78.png)

## 4. 시스템 아키텍쳐

### 4-1) 개발 구조

![서비스 구조도](https://user-images.githubusercontent.com/92101831/177500790-1a8f3580-940b-4d0a-9fcb-5c6ee38a8182.png)

## 5. 프로젝트 팀원 소개

| 이름   | 포지션               | 담당 업무                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 박보선 | 프론트엔드           | 1. 메인 / 로그인 / 회원가입 / 퀴즈 페이지 구현 <br> 2. 로그인 / 회원가입 / 퀴즈 페이지 API 연동 <br> 3. 웹캠 기능 구현 <br> 4. 웹캠과 Mediapipe 연결 <br> 5. 순위 페이지 구현 및 API 연동 <br> 6. 모달 컴포넌트 구현                                                                                                                                                                                                                         |
| 박정훈 | 프론트엔드           | 1. navbar / about / 단어 학습 / 알파벳 학습 페이지 구현 <br> 2. about page section scrolling 구현 <br> 3. 단어 학습 / 알파벳 학습 페이지 API 연동 <br> 4. 타겟층을 고려한 알파벳 애니메이션 / 영상 flip 애니메이션 구현 <br> 5. framer-motion을 활용한 드래그, 애니메이션 <br> 6. 저작권 표시를 위한 footer 컴포넌트 구현 <br> 7. 실시간으로 인공지능과 통신하기 위한 socket.io 구현 <br> 8. 로딩 창, socket 데이터 통신 시 모달창 흐름 구현 |
| 김동현 | 백엔드               | 1. 유저 DB 설계 및 API 개발<br>2. 학습 이력에 따른 포인트 반환하는 기능 추가<br>3. jwt token 설정<br>4. jest test file 작성<br>5. swagger 작성                                                                                                                                                                                                                                                                                               |
| 김유진 | 백엔드/디스코드 관리 | 1. Discord 서버 관리<br>2. 수화 데이터를 가져오는 Hand DB 설계 및 API 구현<br>3. 퀴즈 점수 등록 및 상위 10등 반환해주는 Score DB 설계 및 API 구현<br>4. 퀴즈 문제로 낼 이미지를 반환하는 Quiz DB 설계 및 API 구현<br>5. nginx 및 docker 배포<br>6. 수화 영상 DB 생성 및 관리                                                                                                                                                                 |
| 김채정 | 인공지능/팀장        | 1. LSTM 모델 프로토타입 테스트<br>2. 모델 학습 및 평가<br>3. Jupyter Notebook 코드를 클라이언트 사이드 모델로 변환<br>4. 서비스 성능 개선 위한 flask 코드 작성<br>5. 단어 카드 / 모달창 이미지 디자인<br>6. 핵심 버튼 별 청각장애인 수어 영상을 담은 tooltip 적용<br>7. 단어 검색창 컴포넌트 구현<br>8. 학습 페이지에 들어갈 입모양/단어 수화 영상 촬영                                                                                      |
| 유혜선 | 인공지능/노션 관리   | 1. GPU VM/배포 VM 환경 설정 및 관리<br>2. 모델 학습 및 평가, 정확도 개선<br>3. LSTM 모델 프로토타입 테스트<br>4. 백 사이드 모델 구축(Flask, gunicorn)<br>5. 서버 부하 방지를 위한 백 사이드 모델 경량화<br>6. 서비스 성능 개선 위한 flask 코드 작성<br>7. Docker 및 Gunicorn 배포 관리<br>8. 실시간 프론트 통신을 위한 Socket.io 구현<br>9. 학습 페이지에 들어갈 알파벳 수화 영상 촬영                                                       |
| 전원   | -                    | 1. 인공지능 서비스 배경 조사<br>2. 서비스 기획<br>3. 수화 데이터 직접 촬영하여 수집                                                                                                                                                                                                                                                                                                                                                          |

## 6. 데모

### 메인 페이지

![tootip_hover](https://user-images.githubusercontent.com/92101831/177502168-0355a36e-f897-408c-9803-18c169899ac4.gif)

### 학습 중 맞혔을 때

![readme_demo_alpha_correct](https://user-images.githubusercontent.com/92101831/177502145-f45b1ec2-0ab2-488b-b9d3-1770e3129dd5.gif)

### 학습 중 틀렸을 때

![readme_demo_alpha_incorrect](https://user-images.githubusercontent.com/92101831/177502162-a4f28130-cec6-4469-82d1-0a927e9e7fc2.gif)
