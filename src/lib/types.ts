export interface Quiz {
    id: number
    name: string
    description: string | null
    image: string | null
    questions: Question[]
    time: number | null
    navigate: boolean
    progress: boolean
}

export interface multiSectionQuiz {
    id: number
    title: string                
    description: string | null        
    image?: string | null       
    time: number | null        
    navigate?: boolean             
    progress?: boolean             
    questions: Question[]   
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
    chosenAnswer: number | null
}

export interface QuizResults {
    quizId: number
    username: string
    answers: GivenAnswer[]
}

