import React from "react"
import { decode } from 'html-entities';

/**
 * Question component that displays a single quiz question with its possible answers.
 * 
 * @param {Object} props - The component props.
 * @param {string} props.id - Unique identifier for the question.
 * @param {string} props.question - The quiz question text.
 * @param {string} props.correct - The correct answer to the question.
 * @param {Array} props.incorrect - Array of incorrect answers.
 * @param {boolean} props.submitted - Whether the answers have been submitted.
 * @param {Function} props.handleAnswerChange - Function to handle answer selection change.
 */
export default function Question(props) {
    const [selectedAnswer, setSelectedAnswer] = React.useState("")
    const [answers, setAnswers] = React.useState([])

    // Shuffle answers and set them when the component mounts
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

    // Reset selected answer when the quiz is submitted
    React.useEffect(function() {
        if (props.submitted) {
            setSelectedAnswer("")
        }
    }, [props.submitted])

    /**
     * Shuffles an array using the Fisher-Yates algorithm.
     * 
     * @param {Array} array - The array to shuffle.
     * @returns {Array} - The shuffled array.
     */    
    function shuffleArray(array) {
        // Copy the array to avoid mutating the original one
        let shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
        }
        return shuffledArray;
    }

    /**
     * Handles change event for answer selection.
     * 
     * @param {Object} event - The change event object.
     */
    function handleChange(event) {
        const { value } = event.target
        setSelectedAnswer(value)
        props.handleAnswerChange(props.id, value)
    }

    // Render answer options with appropriate classes based on selection state
    const answerSelection = answers.map((answer, index) => {
        let className = "answer-button"
        if (props.submitted) {
            if (answer === props.correct) {
                className += " correct"
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