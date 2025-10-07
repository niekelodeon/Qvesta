import { useAtom } from "jotai"

import type { QuizData } from "../types"

const serverUrl = "https://5ea4cdb3-d273-47de-a442-6e0219ffd3d4.mock.pstmn.io"

async function Request<T> (endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(serverUrl + endpoint, {
        method: options?.method,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers
        },
        ...options
    })

    if (!response.ok) throw new Error(`QuizApi error ${response.status}: ${await response.text()}`)
    
    return response.json() as Promise<T>
}

export const quizApi = {
    // join should also send the quizData back in the response
    join: (code: number, username: string) => {
        return Request<{ success: boolean, quizData: QuizData }>(`/quiz/join`, {
            method: "POST",
            body: JSON.stringify({ code, username }),
        })
    },

}

