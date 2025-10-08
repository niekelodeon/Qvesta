import React, { useState, useEffect } from "react"
import { useAtom } from "jotai"

import { quizDataAtom, quizCompletedAtom, quizAnswersAtom } from "../lib/atoms"

import type { SubmitAnswers } from "../lib/types"

import { testQuizData } from "../lib/quiz/testQuizData"

import { quizApi } from "../lib/quiz/QuizApi"

import QuizComponent from "../components/QuizComponent"

export default function QuizPage () {
    const [code, setCode] = useState<string>()
    const [username, setUsername] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const [joinedQuiz, setJoinedQuiz] = useState<boolean>(false)

    const [quizData, setQuizData] = useAtom(quizDataAtom)
    const [quizStarted, setQuizStarted] = useState<boolean>(false)
    const [quizAnswers] = useAtom(quizAnswersAtom)
    const [quizCompleted] = useAtom(quizCompletedAtom)

    async function joinQuiz () {
        try {
            const response = await quizApi.join(code, username)

            if (!response.success) setError("Invalid code")
            else if (response.success) setJoinedQuiz(true); setQuizData(response.quizData)
        } catch (err: any) {
            setError(err)
            console.error("Failed to join quiz:", error)
        }
    }

    function startQuiz () {
        setQuizStarted(true)
    }

    async function finishQuiz () {
        const submitAnswers: SubmitAnswers = {
            quizId: quizData.id,
            username,
            answers: quizAnswers
        }

        await quizApi.submit(submitAnswers)
    }

    useEffect(() => {
        finishQuiz()
    }, [quizCompleted])

    return (

        <div className="container">

            {quizCompleted ? (

                <div className="container">

                    <h1>Quiz completed!</h1>

                </div>

            ) : !joinedQuiz ? (

                <div className="container">

                    <h1>Join Quiz</h1>

                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Enter code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />

                    <button onClick={() => joinQuiz()}>Join</button>

                    {error && <p className="error">{error}</p>}

                </div>

            ) : quizStarted ? (

                <div className="container">

                    <QuizComponent />

                </div>

            ) : (
                <div className="container">

                    <h1>{quizData?.name}</h1>
                    
                    <p>{quizData?.description}</p>

                    <button onClick={() => startQuiz()}>Start</button>

                </div>
            )}

        </div>

    )

}