import React, { useState, useEffect } from "react"
import { useAtom } from "jotai"

import { quizDataAtom, quizCompletedAtom, quizAnswersAtom } from "../lib/atoms"
import { testQuizData } from "../lib/quiz/testQuizData"

import { quizApi } from "../lib/quiz/QuizApi"

import Quiz from "../components/QuizComponent"

export default function QuizPage () {
    const [code, setCode] = useState<number>(0)
    const [username, setUsername] = useState<string>("")
    const [joinedQuiz, setJoinedQuiz] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

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
            console.log(err)
        }
    }

    function startQuiz () {
        setQuizStarted(true)
    }

    function finishQuiz () {
        // send the data back to the server to check
    }

    useEffect(() => {
        console.log(quizData, "quizData useAtom")
        console.log(quizStarted, "quizStarted useAtom")
        console.log(quizCompleted, "quizCompleted useAtom")
        console.log(quizAnswers, "quizAnswers useAtom")

        console.log(code, "code useState")
        console.log(username, "username useState")
    }, [quizData, quizStarted, quizCompleted])

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
                        placeholder="Enter quiz code"
                        value={code}
                        onChange={(e) => setCode(Number(e.target.value))}
                    />

                    <button onClick={() => joinQuiz(code, username)}>Join</button>

                    {error && <p className="error">{error}</p>}

                </div>

            ) : quizStarted ? (

                <div className="container">

                    <Quiz />

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