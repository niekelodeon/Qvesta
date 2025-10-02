import React, { useState, useEffect } from "react"

import type { Quiz, Question, GivenAnswer, QuizResults, Progression } from "../lib/types"

import { testQuiz } from "../lib/testQuiz"

export default function Quiz () {
    const [quiz, setQuiz] = useState<Quiz>(testQuiz)
    const [quizTime, setQuizTime] = useState<number | null>(testQuiz.time) 
    const [allowNavigating, setAllowNavigating] = useState<boolean>(testQuiz.navigate)

    const [index, setIndex] = useState(0)
    const [question, setQuestion] = useState<Question>(testQuiz.questions[index]) 
    const [questionTime, setQuestionTime] = useState<number | null>(testQuiz.questions[index].time)
    const [givenAnswers, setGivenAnswers] = useState<GivenAnswer[]>([])

    const [progression, setProgression] = useState<Progression>() 
    const [quizCompleted, setQuizCompleted] = useState<boolean>(false)

    const totalQuestions: number = testQuiz.questions.length

    // when the user doesnt select a answer push null to givenAnswers, null meaning unanswered
    // when the user navigates through questions show what answer he has given, if any.

    function loadQuestion (newIndex: number) {
        const question = testQuiz.questions[newIndex]

        setIndex(newIndex)
        setQuestion(question)
        setQuestionTime(question.time)
    }

    function nextQuestion (answerIndex?: number) {
        if (answerIndex !== undefined && question) {
            saveAnswer(question.id, answerIndex + 1)
        }

        const newIndex = index + 1

        if (newIndex >= totalQuestions) {
            setQuizCompleted(true)

            const quizResults: QuizResults = {
                quizId: testQuiz.id,
                username: "TestQuiz_User", // get username dynamically
                answers: givenAnswers
            }

            console.log(quizResults)
            
            return
        }
        
        loadQuestion(newIndex)
    }

    function prevQuestion () {
        if (index === 0) return 

        const newIndex = index - 1

        loadQuestion(newIndex)
    }

    function saveAnswer (questionId: number, chosenAnswer: number) {
        setGivenAnswers((prev) => {
            const existingIndex = prev.findIndex(a => a.id === questionId)

            if (existingIndex !== -1) {
                // Replace the existing answer
                const updated = [...prev]
                updated[existingIndex] = { id: questionId, chosenAnswer }
                return updated
            }

            // Add new answer
            return [...prev, { id: questionId, chosenAnswer }]
        })
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

                    <h2>{question.question}</h2>

                    <div className="container-answers" style={{ display: "flex", gap: "20px" }}>

                        {question.answers.map((answer, i) => (
                            <span onClick={() => nextQuestion(i)} key={i}>
                                {answer}
                            </span>
                        ))}

                    </div>

                    {allowNavigating ? (

                        <div className="container-navigate">

                            <button onClick={() => prevQuestion()}>Go back</button>

                            <button onClick={() => nextQuestion()}>Go forward</button>

                        </div>

                    ) : (

                        <div className="container-navigate">navigating is disabled</div>

                    )}

                </div>

            )}

        </div>

    )
}
