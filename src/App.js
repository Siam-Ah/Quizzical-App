import React from "react"
import StartPage from "./components/StartPage";
import QuestionPage from "./components/QuestionPage";

function App() {
  const [currentPage, setCurrentPage] = React.useState("startPage")

  function startQuiz() {
    setCurrentPage("questionPage")
  }

  return (
    <div>
      {currentPage === "startPage" && <StartPage startQuiz={startQuiz}/>}
      {currentPage === "questionPage" && <QuestionPage />}
    </div>
  );
}

export default App;
