import React from "react"
import { useState, useEffect } from "react"

import { testQuiz } from "../lib/testQuiz"

import type { Quiz, Question, GivenAnswer, Progression } from "../lib/types"

export default function Quiz () {
    const [quiz, setQuiz] = useState<Quiz>(testQuiz)
    const [quizTime, setQuizTime] = useState<number | null>(testQuiz.time) 
    const [index, setIndex] = useState(0)
    const [question, setQuestion] = useState<Question>(testQuiz.questions[index]) 
    const [questionTime, setQuestionTime] = useState<number | null>(testQuiz.questions[index].time) 
    const [givenAnswers, setGivenAnswers] = useState<GivenAnswer[]>() 
    const [progression, setProgression] = useState<Progression>() 
    const [quizCompleted, setQuizCompleted] = useState<boolean>(false)

    const totalQuestions: number = testQuiz.questions.length

    function nextQuestion () {
        const newIndex = index + 1

        if (newIndex >= totalQuestions) {

            // create full object of the given answer to what question, etc.
            setQuizCompleted(true)
            return
        }
        
        setIndex(newIndex)
        setQuestion(testQuiz.questions[newIndex])
        setQuestionTime(testQuiz.questions[newIndex].time)
    }

    function quizTimer (quizTime: number | null) {
        if (quizTime === null) return 

        let remaining = quizTime

        const interval = setInterval(() => {
            remaining -= 1
            setQuizTime(remaining)

            if (remaining <= 0) {
                clearInterval(interval)
                setQuizCompleted(true)
            }
        }, 1000)

        return () => clearInterval(interval)
    }

    function questionTimer (questionTime: number | null, nextQuestion: Function) {
        if (questionTime === null) return

        let remaining = questionTime

        const interval = setInterval(() => {
            remaining -= 1
            setQuestionTime(remaining)

            if (remaining <= 0) {
                clearInterval(interval)
                nextQuestion()
            }
        }, 1000)

        return () => clearInterval(interval)
    }

    function getProgression () {
        const percentageOfQuestion: number = 100 / totalQuestions 
        const percentage: number = index * percentageOfQuestion

        return percentage
    }

    useEffect(() => {
        console.log(quiz, "Quiz useState")
        console.log(question, "Question useState")

        getProgression()
        return quizTimer(quizTime), questionTimer(questionTime, nextQuestion)

        // then when a answer is selected, run nextQuestion and save the givenAnswer in a object or something that is easy to check for the server
    }, [quiz, question])

    return (

        <div className="container-quiz">

            {quizCompleted ? (
                
                <h1>Quiz completed!</h1>

            ) : (

                <div className="container-question">

                    <h1>{quizTime} Quiz Time</h1>

                    <h1>{questionTime} Question Time</h1>

                    <h1>{quiz.name}</h1>

                    <h2>{question.text}</h2>

                    {question.answers.map((answer, i) => (
                        <span onClick={nextQuestion} key={i}>{answer}</span>
                    ))}

                </div>

            )}

        </div>

        

    )
}