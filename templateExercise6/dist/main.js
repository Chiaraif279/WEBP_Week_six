import { loadQuestions, getQuizQuestions } from "./module/questions.js";
async function startQuiz() {
    const allQuestions = await loadQuestions();
    const quiz = getQuizQuestions(allQuestions);
    console.log(quiz);
}
startQuiz();
