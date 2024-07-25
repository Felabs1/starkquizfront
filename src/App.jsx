import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "w3-css/w3.css";

import Home from "./pages/Home";
import AppProvider from "./provider/AppProvider";
import CreateQuiz from "./components/CreateQuiz";
import CreateQuestions from "./pages/CreateQuestions";
import AnswerQuestions from "./pages/AnswerQuestions";
import CreateQuizPage from "./pages/CreateQuizPage";
import CreateAccount from "./pages/CreateAccount";
function App() {
  const [count, setCount] = useState(0);

  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/create-quiz" element={<CreateQuizPage />} />
          <Route path="/create-questions" element={<CreateQuestions />} />
          <Route path="/answer-questions" element={<AnswerQuestions />} />
          <Route path="/create-quiz/:id" element={<CreateQuestions />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
