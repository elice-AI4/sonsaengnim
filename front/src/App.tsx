import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import { ROUTE } from "./components/route/route";
import Learning from "./components/page/Learning";
import Word from "./components/page/Learning/Word";
import LearningTemplate from "./components/page/Learning/LearningTemplate";
import { alphabetImgs } from "./components/page/Learning/learningData";
import Main from "./components/page/Main/Main";
import Login from "./components/page/Login/Login";
import Register from "./components/page/Register/Register";
import Quiz from "./components/page/Quiz";
import Header from "./components/header/Header";
import About from "./components/page/About";
import Game from "./components/page/Learning/Game";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path={`/${ROUTE.ABOUT.link}`} element={<About />} />
        <Route path={`/${ROUTE.LEARNING.link}`} element={<Learning />} />
        <Route
          path={`/${ROUTE.LEARNING.link}/${ROUTE.ALPHABET.link}`}
          element={
            <LearningTemplate
              imgs={alphabetImgs}
              title="A부터 차근차근 알아가 볼까요?"
            />
          }
        />
        <Route
          path={`/${ROUTE.LEARNING.link}/${ROUTE.ALPHABET.link}/${ROUTE.GAME.link}/:alphabet`}
          element={<Game />}
        />
        <Route
          path={`/${ROUTE.LEARNING.link}/${ROUTE.WORD.link}`}
          element={<Word />}
        />
        <Route path={`/${ROUTE.QUIZ.link}`} element={<Quiz />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
