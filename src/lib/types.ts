export interface QuizData {
    id: number
    name: string
    description: string | null
    image: string | null
    questions: QuestionData[]
    time: number | null
    navigate: boolean
    progress: boolean
}

export interface QuestionData {
    id: number
    question: string
    image?: string
    answers: string[]
    time: number | null
}

export interface GivenAnswer {
    id: number
    chosenAnswer: number | null
}

export interface SubmitAnswers {
    quizId: number
    username: string
    answers: GivenAnswer[]
}

export interface QuizResult {
    quizId: number
    username: string
    answers: GivenAnswer[]
}

// export interface multiSectionQuiz {
//     id: number
//     title: string
//     description: string | null
//     image?: string | null
//     time: number | null
//     navigate?: boolean
//     progress?: boolean
//     questions: Question[]
// }
