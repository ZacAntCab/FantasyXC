// ====== Load teams and runners from localStorage ======
let storedTeams = JSON.parse(localStorage.getItem("teams")) || [];
let draftRunners = JSON.parse(localStorage.getItem("draftRunners")) || [];

// ====== Ensure every team has a players array ======
storedTeams.forEach(team => {
  if (!team.players) team.players = [];
});

// ====== Initialize draft state ======
let draftState = {
  teams: storedTeams.map(team => ({ ...team })),
  availableRunners: draftRunners.map(runner => ({
    ...runner,
    picked: false
  })),
  currentPickIndex: 0,
  draftOrder: []
};

// ====== Generate snake draft order ======
function generateSnakeDraft(numTeams, numRounds) {
  const order = [];
  for (let round = 0; round < numRounds; round++) {
    let roundOrder = [...Array(numTeams).keys()];
    if (round % 2 === 1) roundOrder.reverse();
    order.push(...roundOrder);
  }
  return order;
}

// ====== Start draft animation ======
function startDraftAnimation() {
  const display = document.getElementById("current-team");
  const numTeams = draftState.teams.length;
  let count = 0;

  const interval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * numTeams);
    display.textContent = draftState.teams[randomIndex].name;
    count++;

    if (count > 20) {
      clearInterval(interval);

      // Random first team
      const firstTeamIndex = Math.floor(Math.random() * numTeams);
      display.textContent = draftState.teams[firstTeamIndex].name + " goes first!";

      // Generate snake draft
      const numRounds = 7;
      draftState.draftOrder = generateSnakeDraft(numTeams, numRounds);

      // Swap first pick with random first team
      const firstPickTeam = draftState.draftOrder[0];
      const indexOfFirstTeam = draftState.draftOrder.indexOf(firstTeamIndex);
      draftState.draftOrder[0] = draftState.draftOrder[indexOfFirstTeam];
      draftState.draftOrder[indexOfFirstTeam] = firstPickTeam;

      // Start draft after a short delay
      setTimeout(() => {
        display.textContent = ""; // remove the "X goes first!" message
        renderDraftUI();
      }, 800);
    }
  }, 100);
}

// ====== Render draft UI ======
function renderDraftUI() {
  // Make sure sorting buttons are visible
  document.getElementById("sort-sb").style.display = 'flex';
  document.getElementById("sort-pr").style.display = 'flex';

  const grid = document.getElementById("runners-grid");
  const teamTurn = document.getElementById("team-turn");

  // Draft complete
  if (draftState.currentPickIndex >= draftState.draftOrder.length) {
      // Save teams with picked players
      localStorage.setItem("teams", JSON.stringify(draftState.teams));
      localStorage.setItem('draftFinished', "1")
      // Go to final page
      window.location.href = "final.html"; // change to your final page
    return;
  }

  // Current team
  const teamIndex = draftState.draftOrder[draftState.currentPickIndex];
  const team = draftState.teams[teamIndex];
  teamTurn.textContent = team.name;

  grid.innerHTML = "";

  draftState.availableRunners.forEach((runner, index) => {
    const div = document.createElement("div");
    div.classList.add("runner");
    div.textContent = runner.name; // only show name

    if (runner.picked) div.classList.add("picked");

    div.addEventListener("click", () => {
      if (!runner.picked) pickRunner(index);
    });

    grid.appendChild(div);
  });
}

// ====== Pick a runner ======
function pickRunner(runnerIndex) {
  const teamIndex = draftState.draftOrder[draftState.currentPickIndex];
  const runner = draftState.availableRunners[runnerIndex];

  runner.picked = true;
  draftState.teams[teamIndex].players.push(runner);
  draftState.currentPickIndex++;

  renderDraftUI();
}

// ====== Sorting Functions ======
document.getElementById("sort-pr").addEventListener("click", () => {
  draftState.availableRunners.sort((a, b) => a.pr - b.pr);
  renderDraftUI();
});

document.getElementById("sort-sb").addEventListener("click", () => {
  draftState.availableRunners.sort((a, b) => a.sb - b.sb);
  renderDraftUI();
});

// ====== Start draft on page load ======
window.addEventListener("DOMContentLoaded", () => {
  startDraftAnimation();
});