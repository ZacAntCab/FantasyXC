// Load teams from localStorage
const teams = JSON.parse(localStorage.getItem("teams")) || [];
const resultsContainer = document.getElementById("results-container");

// Calculate team scores and sort by totalScore ascending (lowest is winner)
teams.forEach(team => {
  const sortedRunners = [...team.players].sort((a, b) => a.score - b.score);
  team.totalScore = sortedRunners.slice(0, 5).reduce((sum, r) => sum + (r.score || 0), 0);
});

// Sort teams by totalScore ascending
teams.sort((a, b) => a.totalScore - b.totalScore);

// Identify winner
const winnerScore = teams[0].totalScore;

// Render each team in order
teams.forEach(team => {
  const card = document.createElement("div");
  card.classList.add("result-card");

  if (team.totalScore === winnerScore) {
    card.classList.add("winner");
  }

  const title = document.createElement("h2");
  title.textContent = `${team.name} (${team.coach})`;
  card.appendChild(title);

  // Render runners
  team.players.forEach(runner => {
    const row = document.createElement("div");
    row.classList.add("runner-result");

    const name = document.createElement("span");
    name.textContent = runner.name;
    const score = document.createElement("span");
    score.textContent = runner.score;

    row.appendChild(name);
    row.appendChild(score);
    card.appendChild(row);
  });

  // Total team score
  const total = document.createElement("h3");
  total.textContent = `Team Score: ${team.totalScore}`;
  card.appendChild(total);

  resultsContainer.appendChild(card);
});

document.querySelector('#restart').addEventListener('click', () => {
  localStorage.clear()

  window.location.href = "index.html"
})
