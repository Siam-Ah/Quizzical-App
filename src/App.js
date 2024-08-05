import React from "react"
import StartPage from "./components/StartPage";
import QuestionPage from "./components/QuestionPage";

/**
 * App component that manages the state of the current page and renders 
 * either the StartPage or QuestionPage based on the state.
 */
function App() {
  const [currentPage, setCurrentPage] = React.useState("startPage")

    /**
     * Function to transition from the start page to the question page.
     */
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
