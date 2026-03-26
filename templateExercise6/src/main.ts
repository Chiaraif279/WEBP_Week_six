import { loadQuestions, getQuizQuestions, Question } from "./module/questions.js";


async function startQuiz() {
    const allQuestions: Question[] = await loadQuestions();
    const quiz: Question[] = getQuizQuestions(allQuestions);
    console.log(quiz);
}

startQuiz();