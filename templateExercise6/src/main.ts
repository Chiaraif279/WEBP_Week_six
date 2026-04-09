import { UI } from "./module/ui.js";
import { loadQuestions, getQuizQuestions, Question } from "./module/questions.js";
import { Player, storePointsAndScore } from "./module/scoring.js";

const ui = new UI();

let player: Player;
let currentIndex = 0;
let givenAnswers: string[] = [];
let selectedQuestions: Question[] = [];

// Funktion, um die nächste Frage anzuzeigen
function showNextQuestion() {
  if (currentIndex < selectedQuestions.length) {
    const question = selectedQuestions[currentIndex];

    ui.showQuestion(question, (answer) => {
      givenAnswers.push(answer);
      const isCorrect = answer === question.answer;

      ui.showFeedback(isCorrect, question.answer, () => {
        currentIndex++;
        showNextQuestion();
      });
    });
  } else {
    // Quiz fertig → Punkte berechnen
    storePointsAndScore(selectedQuestions, givenAnswers, player);
    ui.showFinalResult(player, restartQuiz);
    ui.showLeaderboard(player);
  }
}

// Neustart-Funktion
function restartQuiz() {
  currentIndex = 0;
  givenAnswers = [];
  player.score = 0;
  player.points = 0;
  player.maxPoints = 0;

  startQuiz();
}

// Quiz starten: Fragen laden und Spielername eingeben
async function startQuiz() {
  const allQuestions: Question[] = await loadQuestions();
  selectedQuestions = getQuizQuestions(allQuestions);
  currentIndex = 0;
  givenAnswers = [];

  ui.showPlayerInput((name: string) => {
    player = { name, score: 0, points: 0, maxPoints: 0 };
    showNextQuestion();
    ui.showLeaderboard(player);
  });
}

// Programmstart
startQuiz();