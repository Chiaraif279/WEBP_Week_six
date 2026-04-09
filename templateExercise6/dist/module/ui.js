let container;
export function initUI() {
    const box = document.getElementById("quiz-container");
    box.style.display = "block";
    container = box.querySelector(".card-body");
}
export function showPlayerInput(onStart) {
    const inputDiv = document.getElementById("player-input");
    inputDiv.innerHTML = `
    <input type="text" id="player-name" class="form-control mb-2" placeholder="Dein Name">
    <button class="btn btn-primary">Start</button>
  `;
    const button = inputDiv.querySelector("button");
    button.addEventListener("click", () => {
        const nameInput = document.getElementById("player-name");
        const name = nameInput.value.trim();
        if (name) {
            onStart(name);
            inputDiv.innerHTML = "";
        }
    });
}
export function showQuestion(questionObj, onAnswerSelected) {
    container.innerHTML = `
    <h2 class="question-text mb-3">${questionObj.question}</h2>
    ${questionObj.options.map(a => `<button class="btn btn-answer d-block mb-2">${a}</button>`).join("")}
  `;
    container.querySelectorAll(".btn-answer").forEach(btn => {
        btn.addEventListener("click", () => onAnswerSelected(btn.textContent));
    });
}
export function showFeedback(isCorrect, correctAnswer, onNext) {
    container.innerHTML += `
    <div class="mt-3">
      <p class="${isCorrect ? "text-success" : "text-danger"}">
        ${isCorrect ? "Richtig!" : `Falsch! Richtige Antwort: ${correctAnswer}`}
      </p>
      <button class="btn btn-primary mt-2" id="next-btn">Weiter</button>
    </div>
  `;
    document.getElementById("next-btn").addEventListener("click", onNext);
}
export function showFinalResult(player, onRestart) {
    container.innerHTML = `
    <h2>Ergebnis</h2>
    <p><strong>Name:</strong> ${player.name}</p>
    <p><strong>Punkte:</strong> ${player.points} / ${player.maxPoints}</p>
    <p><strong>Score:</strong> ${player.score} %</p>
    <button class="btn btn-success mt-3" id="restart-btn">Neustart</button>
  `;
    document.getElementById("restart-btn").addEventListener("click", onRestart);
}
export function showLeaderboard(currentPlayer) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    if (currentPlayer) {
        leaderboard.push(currentPlayer);
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 10);
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    }
    const leaderboardDiv = document.getElementById("leaderboard");
    const oldList = leaderboardDiv.querySelector("ul");
    if (oldList)
        oldList.remove();
    const list = document.createElement("ul");
    list.className = "list-group";
    for (const p of leaderboard) {
        const item = document.createElement("li");
        item.className = "list-group-item";
        item.textContent = `${p.name}: ${p.score}%`;
        list.appendChild(item);
    }
    leaderboardDiv.appendChild(list);
}
