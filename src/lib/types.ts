export interface Quiz {
    id: number
    name: string
    questions: Question[]
    time: number
    type: string
    navigate: boolean
}

export interface Question {
    id: number
    question: string
    image?: string
    answers: string[]
    time: number | null
}

export interface GivenAnswer {
    id: number
    chosenAnswer: number
}

export interface QuizResults {
    quizId: number
    username: string
    answers: GivenAnswer[]
}

export interface Progression {
    percentage: number
}

