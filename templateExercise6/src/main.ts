import { loadQuestions, getQuizQuestions, Question } from "./module/questions.js";
import { Player, storePointsAndScore, MAX_POINTS } from "./module/scoring.js";
import * as UI from "./module/ui.js";

let allQuestions: Question[] = [];
let quizQuestions: Question[] = [];
let currentPlayer: Player;
let currentIndex = 0;
let givenAnswers: string[] = [];

UI.initUI();
UI.showLeaderboard();

// Quiz starten
UI.showPlayerInput(async (name: string) => {
  currentPlayer = { name, score: 0, points: 0, maxPoints: MAX_POINTS };
  
  allQuestions = await loadQuestions();
  quizQuestions = getQuizQuestions(allQuestions);

  currentIndex = 0;
  givenAnswers = [];
  
  showNextQuestion();
});

function showNextQuestion() {
  if (currentIndex < quizQuestions.length) {
    const question = quizQuestions[currentIndex];
    UI.showQuestion(question, (answer: string) => {
      givenAnswers.push(answer);
      const isCorrect = answer === question.answer;

      UI.showFeedback(isCorrect, question.answer, () => {
        currentIndex++;
        showNextQuestion();
      });
    });
  } else {
    // Quiz beendet
    storePointsAndScore(quizQuestions, givenAnswers, currentPlayer);
    
    UI.showFinalResult(currentPlayer, restartQuiz);
    UI.showLeaderboard(currentPlayer);
  }
}

function restartQuiz() {
  const quizContainer = document.getElementById("quiz-container")!;
  quizContainer.style.display = "none";
  
  currentIndex = 0;
  givenAnswers = [];
  quizQuestions = getQuizQuestions(allQuestions);
  
  UI.showPlayerInput((name: string) => {
    currentPlayer = { name, score: 0, points: 0, maxPoints: MAX_POINTS };
    quizContainer.style.display = "block";
    showNextQuestion();
  });
}