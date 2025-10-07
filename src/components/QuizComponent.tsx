import React, { useState, useEffect } from "react"
import { useAtom } from "jotai"

import { quizDataAtom, quizCompletedAtom, quizAnswersAtom } from "../lib/atoms"

import type { QuestionData } from "../lib/types"

export default function Quiz () {
    const [quizData, setQuizData] = useAtom(quizDataAtom)
    const [quizAnswers, setQuizAnswers] = useAtom(quizAnswersAtom)
    const [quizCompleted, setQuizCompleted] = useAtom(quizCompletedAtom)

    const [quizTime, setQuizTime] = useState<number | null>(quizData.time) 

    const [questionIndex, setQuestionIndex] = useState(0)
    const [questionData, setQuestionData] = useState<QuestionData>(quizData.questions[questionIndex]) 
    const [questionTime, setQuestionTime] = useState<number | null>(quizData.questions[questionIndex].time)
    const [totalQuestions, setTotalQuestions] = useState<number>(quizData.questions.length)
    const [givenAnswer, setGivenAnswer] = useState<any>()

    const [allowNavigating, setAllowNavigating] = useState<boolean>(quizData.navigate)
    const [progression, setProgression] = useState<number>(0) 
    
    function getAnswer (questionId: number) {
        const answer = quizAnswers.find(a => a.id === questionId)
        setGivenAnswer(answer?.chosenAnswer ?? null)
    }

    function saveAnswer (questionId: number, chosenAnswer: number | null) {
        chosenAnswer = chosenAnswer ?? null

        setQuizAnswers((prev) => {
            const existingIndex = prev.findIndex(a => a.id === questionId)

            if (existingIndex !== -1) {
                const updated = [...prev]
                updated[existingIndex] = { id: questionId, chosenAnswer }
                return updated
            }

            return [...prev, { id: questionId, chosenAnswer }]
        })
    }

    function loadQuestion (newIndex: number) {
        const question = quizData.questions[newIndex]

        setQuestionIndex(newIndex)
        setQuestionData(question)
        setQuestionTime(question.time)
    }

    function nextQuestion (answerIndex?: number | null) {
        if (!questionData) return

        const chosenAnswer =
        typeof answerIndex === "number"
        ? answerIndex + 1
        : quizAnswers.find(a => a.id === questionData.id)?.chosenAnswer ?? null

        saveAnswer(questionData.id, chosenAnswer)
        setGivenAnswer(chosenAnswer)

        const next = questionIndex + 1
        if (next >= totalQuestions) {
            setQuizCompleted(true)
            console.log({ quizId: quizData.id, username: "TestQuiz_User", answers: quizAnswers })
            return
        }

        loadQuestion(next)
    }

    function prevQuestion () {
        if (questionIndex === 0) return 

        const newIndex = questionIndex - 1

        loadQuestion(newIndex)
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

    useEffect(() => {
        console.log(quizData, "Quiz useState")
        console.log(questionData, "Question useState")
        console.log(questionIndex, "Index useState")
        console.log(givenAnswer, "givenAnswer useState")        
        console.log(quizAnswers, "givenAnswers useState")
        console.log(progression, "Progression useState")
        
        setProgression(Math.round((questionIndex * 100) / totalQuestions))
        getAnswer(questionData.id)
        return quizTimer(quizTime), questionTimer(questionTime, nextQuestion)
    }, [quizData, questionIndex])

    return (

        <div className="container">

            <div className="container">

                <div className="container">

                    <h1>{quizTime} Quiz Time</h1>

                    <h1>{questionTime} Question Time</h1>

                    <h2>{questionData.question}</h2>

                </div>

                <div className="container-answers" style={{ display: "flex", gap: "20px" }}>

                    {questionData.answers.map((answer, i) => (

                        <span onClick={() => nextQuestion(i)} key={i}>

                            {answer}
                            
                        </span>

                    ))}

                    {givenAnswer !== null && givenAnswer !== undefined ? givenAnswer : "Not answered"}

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

        </div>

    )
}
