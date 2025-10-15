// ====== Load teams and setup ======
let teams = JSON.parse(localStorage.getItem("teams")) || [];
let currentTeamIndex = 0;

const teamNameEl = document.getElementById("team-name");
const scoreForm = document.getElementById("score-form");
const nextBtn = document.getElementById("next-btn");

// ====== Render current team ======
function renderTeam() {
  const team = teams[currentTeamIndex];
  teamNameEl.textContent = team.name;

  scoreForm.innerHTML = ""; // Clear previous inputs

  team.players.forEach((player, i) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("player-score");

    const label = document.createElement("label");
    label.textContent = player.name;
    label.style.display = "block";

    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Place";
    input.value = player.score || "";

    // Update score live
    input.addEventListener("input", (e) => {
      player.score = parseFloat(e.target.value);
    });

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    scoreForm.appendChild(wrapper);
  });
}

// ====== Move to next team ======
nextBtn.addEventListener("click", () => {
  if (currentTeamIndex < teams.length - 1) {
    currentTeamIndex++;
    renderTeam();
  } else {
    // Save all entered scores
    localStorage.setItem("teams", JSON.stringify(teams));
    localStorage.setItem('gameFinished', '1')
    window.location.href = "finalResults.html"; // next page
  }
});

// ====== Initialize ======
window.addEventListener("DOMContentLoaded", renderTeam);

document.querySelector('#restart').addEventListener('click', () => {
  localStorage.clear()

  window.location.href = "index.html"
})
