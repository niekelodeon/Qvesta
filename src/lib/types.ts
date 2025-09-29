export interface Quiz {
    id: string
    name: string
    questions: Question[]
    time: number
}

export interface Question {
    id: string
    text: string
    image?: string
    answers: string[]
    time: number | null
}

export interface GivenAnswer {
    questionId: string
    selectedAnswerIndex: number
}

export interface Progression {
    percentage: number
}
