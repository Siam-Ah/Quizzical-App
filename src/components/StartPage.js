import React from "react"

/**
 * StartPage component that displays the start screen of the quiz application.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.startQuiz - Function to start the quiz.
 */
export default function StartPage(props) {
    return (
        <main className="start-page">
            <h1 className="title">Quizzical</h1>
            <p className="description">Some description if needed</p>
            <button className="start-button" onClick={()=>props.startQuiz()}>Start Quiz</button>
        </main>
    )
}