const teams = JSON.parse(localStorage.getItem("teams")) || [];

// Container to hold all team cards
const container = document.getElementById("teams-container");

// Loop through each team and create a card
teams.forEach(team => {
  const card = document.createElement("div");
  card.classList.add("final-team-card");
  
  // Team name
  const teamName = document.createElement("h2");
  teamName.textContent = team.name;
  card.appendChild(teamName);
  
  // Optional: coach name
  if (team.coach) {
    const coachName = document.createElement("h3");
    coachName.textContent = team.coach;
    card.appendChild(coachName);
  }
  
  // List of picked runners
  const list = document.createElement("ul");
  team.players.forEach(runner => {
    const li = document.createElement("li");
    li.textContent = runner.name;
    list.appendChild(li);
  });
  card.appendChild(list);
  
  // Add card to container
  container.appendChild(card);
});

document.querySelectorAll('.nav-btn')[0].addEventListener('click', () => {
  localStorage.clear()

  window.location.href = "index.html"
})