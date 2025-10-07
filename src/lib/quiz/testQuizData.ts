import type { QuizData } from "../types"

export const testQuizData: QuizData = {
    id: 1,
    name: "Basic Knowledge Quiz",
    description: "A quiz to test your knowledge :)",
    image: "",
    time: 1000,
    navigate: true,
    progress: true,
    questions: [
        {
            id: 1,
            question: "What is the capital of France?",
            image: undefined,
            answers: ["Berlin", "Madrid", "Paris", "Rome"],
            time: null
        },
        {
            id: 2,
            question: "What is 2 + 2?",
            image: undefined,
            answers: ["3", "4", "5", "22"],
            time: null
        },
        {
            id: 3,
            question: "Which planet is known as the Red Planet?",
            image: undefined,
            answers: ["Earth", "Mars", "Jupiter"],
            time: null
        },
        {
            id: 4,
            question: "What is the largest mammal on Earth?",
            image: undefined,
            answers: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
            time: null
        },
        {
            id: 5,
            question: "Which element has the chemical symbol 'O'?",
            image: undefined,
            answers: ["Oxygen", "Gold", "Iron", "Helium"],
            time: null
        },
        {
            id: 6,
            question: "What is the capital city of Japan?",
            image: undefined,
            answers: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
            time: null
        }
    ]
}