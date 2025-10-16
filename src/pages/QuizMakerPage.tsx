import React, { useState, useEffect } from 'react'
import { useAtom } from 'jotai'

import type { QuizData, QuestionData } from '../lib/types'

export default function QuizMakerPage() {
    const [step, setStep] = useState<number>(1)

    const [quizData, setQuizData] = useState<QuizData>()
    const [quizName, setQuizName] = useState<string>('')
    const [quizDescription, setQuizDescription] = useState<string>('')
    const [quizImage, setQuizImage] = useState<string>('')
    const [quizTime, setQuizTime] = useState<number | null>(null)
    const [quizNavigate, setQuizNavigate] = useState<boolean>(false)
    const [quizProgress, setQuizProgress] = useState<boolean>(false)

    const [questionData, setQuestionData] = useState<QuestionData>()

    function createQuiz() {
        setQuizData({
            id: 0,
            name: quizName,
            description: quizDescription,
            image: quizImage,
            time: quizTime,
            navigate: quizNavigate,
            progress: quizProgress,
            questions: [],
        })

        console.log(quizData)
    }

    function createQuestion() {}

    function updateQuestion() {}

    return (
        <div className="container">
            <input placeholder="Quiz name" value={quizName} onChange={e => setQuizName(e.target.value)} />

            <input placeholder="Quiz description" value={quizDescription} onChange={e => setQuizDescription(e.target.value)} />

            <div className="container">Upload</div>

            <input placeholder="Total quiz time" type="number" value={quizTime} onChange={e => setQuizTime(Number(e.target.value))} />

            <div className="checkbox">
                <input type="checkbox" checked={quizNavigate} onChange={e => setQuizNavigate(e.target.checked)} />
                Allow navigation
            </div>

            <div className="checkbox">
                <input type="checkbox" checked={quizProgress} onChange={e => setQuizProgress(e.target.checked)} />
                Show progress
            </div>

            <button onClick={() => createQuiz()}>Create Quiz</button>
        </div>
    )
}
