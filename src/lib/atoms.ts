import { atom } from 'jotai'

import type { QuizData, GivenAnswer } from './types'

export const quizDataAtom = atom<QuizData>()
export const quizCompletedAtom = atom<boolean>(false)
export const quizAnswersAtom = atom<GivenAnswer[]>([])
