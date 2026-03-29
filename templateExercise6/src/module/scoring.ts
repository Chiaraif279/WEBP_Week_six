import { Question } from "./questions.js";

export interface Player {
    name: string,
    score: number,
    points: number,
    maxPoints: number
}

export const MAX_POINTS: number = 9; // 2x easy(1P), 2x medium(2P), 1x hard(3P)

export function getPointsToQuestion(question: Question, answer: string): number {
    if(question.answer === answer) {
        if(question.difficulty === "easy") {
            return 1;
        } else if(question.difficulty === "medium") {
            return 2;
        } else if(question.difficulty === "hard") {
            return 3;
        }
    }
    return 0;
}

export function storePointsAndScore(selectedQuestions: Question[], givenAnswers: string[], player: Player): void {
    let numOfPoints: number = 0;
    for (let i = 0; i < selectedQuestions.length; i++) {
        numOfPoints += getPointsToQuestion(selectedQuestions[i], givenAnswers[i]);
    }
    player.points = numOfPoints;
    player.maxPoints = MAX_POINTS;
    let decimalScore: number = player.points / player.maxPoints * 100;
    player.score = Math.round(decimalScore * 100) / 100; // auf 2 Nachkommastellen gerundet
}