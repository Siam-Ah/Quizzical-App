import React from "react"
import Question from "./Question"

/**
 * QuestionPage component that handles fetching questions, managing user answers,
 * and calculating the correct answer count.
 */
export default function QuestionPage() {
    const [questionData, setQuestionData] = React.useState([])
    const [userAnswers, setUserAnswers] = React.useState({})
    const [submitted, setSubmitted] = React.useState(false)
    const [correctCount, setCorrectCount] = React.useState(0)

    /**
     * Fetch questions when the component mounts.
     */
    React.useEffect(function() {
        fetchQuestions()
    }, [])

    /**
     * Fetches quiz questions from the Open Trivia Database API.
     */
    function fetchQuestions() {
        fetch("https://opentdb.com/api.php?amount=10&category=22&difficulty=easy")
            .then(res => res.json())
            .then(data => setQuestionData(data.results))
            .catch(error => {
                console.error('Error fetching the questions:', error);
                setQuestionData([]);
            });
    }

    /**
     * Handles changes in answer selection for a specific question.
     * 
     * @param {string} questionId - The ID of the question.
     * @param {string} answer - The selected answer.
     */
    function handleAnswerChange(questionId, answer) {
        setUserAnswers(prevUserAnswers => ({
            ...prevUserAnswers,
            [questionId]: answer,
        }))
    }

    /**
     * Handles form submission for checking answers or starting a new quiz.
     * 
     * @param {Object} event - The form submit event.
     */
    function handleSubmit(event) {
        event.preventDefault()

        if(!submitted) {
            setSubmitted(true)

            // Count the number of correct answers
            let count = 0
            for(let i = 0; i < questionData.length; i++) {
                if(questionData[i].correct_answer === userAnswers[i]) {
                    count = count + 1
                }
            }
            setCorrectCount(count)
        }

        else {
            // Reset for a new quiz
            setUserAnswers({})
            setSubmitted(false)
            setCorrectCount(0)
            fetchQuestions()
        }
    }

    // Create Question components for each question in the questionData
    const questionElements = questionData.map((question, index) => (
        <Question className="question-container"
            key={`${question.question}-index`} 
            id={index}
            question = {question.question}
            correct = {question.correct_answer}
            incorrect = {question.incorrect_answers}
            userAnswer = {userAnswers[index]}
            handleAnswerChange = {handleAnswerChange}
            submitted = {submitted}
        />
    ))

    return (
        <div className="question-page">
            <form onSubmit={handleSubmit}>
                {questionData.length > 0 ? (
                    <>
                        {questionElements}
                        <button type="submit" className="submit-button">
                            {!submitted ? "Check answers" : "Play again"}
                        </button>
                        {submitted && (
                            <p>You have scored {correctCount}/{questionData.length} correct answers</p>
                        )}
                    </>
                ) : (
                    <p>Loading questions...</p>
                )}
            </form>
        </div>
    )
}