import React from "react"
import Question from "./Question"
import {nanoid} from "nanoid"

export default function QuestionPage() {
    const [questionData, setQuestionData] = React.useState([])
    const [userAnswers, setUserAnswers] = React.useState({})
    const [submitted, setSubmitted] = React.useState(false)
    const [correctCount, setCorrectCount] = React.useState(0)

    console.log(correctCount)

    React.useEffect(function() {
        fetchQuestions()
    }, [])

    function fetchQuestions() {
        fetch("https://opentdb.com/api.php?amount=10&category=22&difficulty=easy")
            .then(res => res.json())
            .then(data => setQuestionData(data.results))
    }

    function handleAnswerChange(questionId, answer) {
        setUserAnswers(prevUserAnswers => ({
            ...prevUserAnswers,
            [questionId]: answer,
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()

        if(!submitted) {
            setSubmitted(true)

            let count = 0
            for(let i = 0; i < questionData.length; i++) {
                if(questionData[i].correct_answer === userAnswers[i]) {
                    count = count + 1
                }
            }
            setCorrectCount(count)
        }

        else {
            setUserAnswers({})
            setSubmitted(false)
            setCorrectCount(0)
            fetchQuestions()
        }
    }
    
    // function addCorrect() {
    //     setCorrectCount(prevCorrectCount => prevCorrectCount + 1)
    // }

    console.log(questionData)

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
            // addCorrect = {addCorrect}
        />
    ))

    return (
        <div className="question-page">
            <form onSubmit={handleSubmit}>
                {questionElements}
                <button type="submit" className="submit-button">{!submitted ? "Check answers" : "Play again"}</button>
                {submitted && <p>You have scored {correctCount}/{questionData.length} correct answers</p>}
            </form>
        </div>
    )
}