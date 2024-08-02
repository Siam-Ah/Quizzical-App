import React from "react"

export default function StartPage(props) {
    return (
        <main className="start-page">
            <h1 className="title">Quizzical</h1>
            <p className="description">Some description if needed</p>
            <button className="start-button" onClick={()=>props.startQuiz()}>Start Quiz</button>
        </main>
    )
}