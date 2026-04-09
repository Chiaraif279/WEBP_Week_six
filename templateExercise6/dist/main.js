import { loadQuestions, getQuizQuestions } from "./module/questions.js";
import { storePointsAndScore, MAX_POINTS } from "./module/scoring.js";
import * as UI from "./module/ui.js";
// Initialisiere UI-Container
UI.initUI();
// Quiz-Variablen
let allQuestions = [];
let quizQuestions = [];
let currentPlayer;
let currentIndex = 0;
let givenAnswers = [];
// Quiz starten
UI.showPlayerInput(async (name) => {
    currentPlayer = { name, score: 0, points: 0, maxPoints: MAX_POINTS };
    // Fragen laden
    allQuestions = await loadQuestions();
    quizQuestions = getQuizQuestions(allQuestions);
    currentIndex = 0;
    givenAnswers = [];
    showNextQuestion();
});
// Nächste Frage anzeigen
function showNextQuestion() {
    if (currentIndex < quizQuestions.length) {
        const question = quizQuestions[currentIndex];
        UI.showQuestion(question, (answer) => {
            givenAnswers.push(answer);
            const isCorrect = answer === question.answer;
            UI.showFeedback(isCorrect, question.answer, () => {
                currentIndex++;
                showNextQuestion();
            });
        });
    }
    else {
        // Quiz beendet → Score berechnen
        storePointsAndScore(quizQuestions, givenAnswers, currentPlayer);
        UI.showFinalResult(currentPlayer, restartQuiz);
        UI.showLeaderboard(currentPlayer);
    }
}
// Quiz neustarten
function restartQuiz() {
    currentIndex = 0;
    givenAnswers = [];
    quizQuestions = getQuizQuestions(allQuestions);
    UI.showPlayerInput((name) => {
        currentPlayer = { name, score: 0, points: 0, maxPoints: MAX_POINTS };
        showNextQuestion();
    });
}
