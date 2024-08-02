import React from "react"
import { decode } from 'html-entities';

export default function Question(props) {
    const [selectedAnswer, setSelectedAnswer] = React.useState("")
    const [answers, setAnswers] = React.useState([])

    React.useEffect(function() {
        const {correct, incorrect } = props
        if(correct === "True") {
            setAnswers([correct, ...incorrect])
        }
        else if(correct === "False") {
            setAnswers([...incorrect, correct])
        }
        else {
            setAnswers(shuffleArray([correct, ...incorrect]))
        }
    }, [])

    React.useEffect(function() {
        if (props.submitted) {
            setSelectedAnswer("")
        }
    }, [props.submitted])

    function shuffleArray(array) {
        // Copy the array to avoid mutating the original one
        let shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
        }
        return shuffledArray;
    }

    function handleChange(event) {
        const { value } = event.target
        setSelectedAnswer(value)
        props.handleAnswerChange(props.id, value)
    }

    const answerSelection = answers.map((answer, index) => {
        let className = "answer-button"
        if (props.submitted) {
            if (answer === props.correct) {
                className += " correct"
                // if (props.userAnswer === props.correct) {
                //     props.addCorrect()
                // }
            } else if (answer === props.userAnswer) {
                className += " incorrect"
            }
        }

        return (
            <div key={index} className="answer-button-container">
                <input 
                    type="radio"
                    id={`answer-${props.id}-${index}`}
                    name={`question-${props.id}`}
                    value={answer}
                    checked={selectedAnswer === answer}
                    onChange={handleChange}
                    className="hidden-radio"
                    disabled={props.submitted}
                />
                <label 
                    htmlFor={`answer-${props.id}-${index}`} 
                    className={className} 
                >
                    {decode(answer)}
                </label>
            </div> 
    )})

    return (
        <div>
            <p className="question">{decode(props.question)}</p>
            <div className="answers-container">
                {answerSelection}
            </div>
            <hr className="line-break"/>
        </div>
    )
}