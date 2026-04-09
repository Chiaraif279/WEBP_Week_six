export async function loadQuestions() {
    try {
        const response = await fetch("./questions.json");
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log("Error loading questions: ", error);
        return [];
    }
}
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
export function getQuizQuestions(all) {
    const easy = all.filter(q => q.difficulty === "easy");
    const medium = all.filter(q => q.difficulty === "medium");
    const hard = all.filter(q => q.difficulty === "hard");
    const selectedEasy = shuffle(easy).slice(0, 2); // 2 easy
    const selectedMedium = shuffle(medium).slice(0, 2); // 2 medium
    const selectedHard = shuffle(hard).slice(0, 1); // 1 hard
    const finalList = selectedEasy.concat(selectedMedium, selectedHard);
    return shuffle(finalList);
}
