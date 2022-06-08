import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import { ROUTE } from "./components/route/route";
import Learning from "./components/page/learning/Learning";
import Word from "./components/page/learning/word/Word";
import LearningTemplate from "./components/page/learning/learningTemplate/LearningTemplate";
import { alphabetImgs } from "./components/page/learning/learningData";
import Main from "./components/page/main/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
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
          path={`/${ROUTE.LEARNING.link}/${ROUTE.WORD.link}`}
          element={<Word />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
