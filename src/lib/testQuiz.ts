import type { Quiz } from "./types"

export const testQuiz: Quiz = {
    id: "test-quiz",
    name: "Basic Knowledge Quiz",
    time: 60,
    questions: [
        {
            id: "1",
            text: "What is the capital of France?",
            image: undefined,
            answers: ["Berlin", "Madrid", "Paris", "Rome"],
            time: 5
        },
        {
            id: "2",
            text: "What is 2 + 2?",
            image: undefined,
            answers: ["3", "4", "5", "22"],
            time: 5
        },
        {
            id: "3",
            text: "Which planet is known as the Red Planet?",
            image: undefined,
            answers: ["Earth", "Mars", "Jupiter", "Saturn"],
            time: null
        },
        {
            id: "4",
            text: "What is the largest mammal on Earth?",
            image: undefined,
            answers: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
            time: 5
        },
        {
            id: "5",
            text: "Which element has the chemical symbol 'O'?",
            image: undefined,
            answers: ["Oxygen", "Gold", "Iron", "Helium"],
            time: null
        },
        {
            id: "6",
            text: "What is the capital city of Japan?",
            image: undefined,
            answers: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
            time: 5
        }
    ]
}