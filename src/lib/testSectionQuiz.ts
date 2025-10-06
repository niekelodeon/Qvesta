import type { Quiz } from "./types"

export const multiSectionQuiz: Quiz = {
    id: 2,
    name: "Multi-Section Knowledge Quiz",
    image: "",
    navigate: true,
    progress: true,
    questions: [],
    sections: [
        {
            id: 1,
            title: "Basics",
            description: "This section covers basic knowledge. Take your time!", // on the "start section" dia
            image: "",
            time: 5000, // time per section, counting down when the first question starts
            navigate: true,
            progress: true,
            questions: [
                {
                    id: 1,
                    question: "What is 2 + 2?",
                    image: undefined,
                    answers: ["3", "4", "5", "22"],
                    time: null
                },
                {
                    id: 2,
                    question: "What is the capital of France?",
                    image: undefined,
                    answers: ["Berlin", "Madrid", "Paris", "Rome"],
                    time: null
                }
            ]
        },
        {
            id: 2,
            title: "Advanced",
            description: "Now we move on to more advanced questions.",
            image: "",
            time: 400,
            navigate: true,
            progress: true,
            questions: [
                {
                    id: 3,
                    question: "Which planet is known as the Red Planet?",
                    image: undefined,
                    answers: ["Earth", "Mars", "Jupiter", "Saturn"],
                    time: null
                },
                {
                    id: 4,
                    question: "What is the largest mammal on Earth?",
                    image: undefined,
                    answers: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
                    time: null
                }
            ]
        },
        {
            id: 3,
            title: "Expert",
            description: "Final section with tricky questions.",
            image: "",
            time: 500,
            navigate: true,
            progress: true,
            questions: [
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
    ]
}
