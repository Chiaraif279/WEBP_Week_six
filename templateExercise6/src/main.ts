/*import { loadQuestions, getQuizQuestions, Question } from "./module/questions.js";
import * as Scoring from "./module/scoring.js";


async function startQuiz() {
    const allQuestions: Question[] = await loadQuestions();
    const quiz: Question[] = getQuizQuestions(allQuestions);
    console.log(quiz);
}

startQuiz();*/
import { UI } from "./module/ui.js";
import { Question } from "./module/questions.js";
import { Player, storePointsAndScore } from "./module/scoring.js";

const ui = new UI();

// Test-Spieler
let player: Player = {
  name: "test",
  score: 0,
  points: 0,
  maxPoints: 0
};

// Testfragen
const testQuestions: Question[] = [
  {
    category: "HTML",
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Tool Multi Language"
    ],
    answer: "Hyper Text Markup Language",
    difficulty: "easy"
  },
  {
    category: "CSS",
    question: "Was macht CSS?",
    options: ["Styling", "Programmierlogik", "Speichern", "Rechnen"],
    answer: "Styling",
    difficulty: "easy"
  },
  {
    category: "JS",
    question: "Welches Keyword deklariert eine Variable?",
    options: ["var", "function", "if", "return"],
    answer: "var",
    difficulty: "easy"
  }
];

let givenAnswers: string[] = [];
let currentIndex = 0;

// Funktion, um die nächste Frage zu zeigen
function showNextQuestion() {
  if (currentIndex < testQuestions.length) {
    const q = testQuestions[currentIndex];
    ui.showQuestion(q, (answer) => {
      givenAnswers.push(answer);
      const isCorrect = answer === q.answer;
      ui.showFeedback(isCorrect, q.answer, () => {
        currentIndex++;
        showNextQuestion();
      });
    });
  } else {
    storePointsAndScore(testQuestions, givenAnswers, player);
    ui.showFinalResult(player, restartQuiz);
    ui.showLeaderboard(player);
  }
}

// Neustart-Funktion
function restartQuiz() {
  givenAnswers = [];
  currentIndex = 0;
  player.score = 0;
  player.points = 0;
  player.maxPoints = 0;
  showNextQuestion();
}

// Start des Test-Quizzes
showNextQuestion();
ui.showLeaderboard(player);
