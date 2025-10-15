window.addEventListener('load', () => {
    if (localStorage.getItem('gameFinished') == '1') {
        window.location.href = "finalResults.html"
    }
    else if (localStorage.getItem('draftFinished') == '1') {
        window.location.href = "final.html"
    }
    else (localStorage.clear())
})

const createTeamBtn = document.querySelector('.create-team-btn')
const teamInfoForm = document.querySelector('.team-info-form')
const teamNameInput = document.querySelector('.team-name-input')
const coachNameInput = document.querySelector('.coach-name-input')
const teamInfoDislayTemplate = document.querySelector('.team-info-display-template')
const teamsDisplay = document.querySelector('.teams-display')

const choosePlayersBtn = document.querySelector('#choose-players-btn')

let teams = []

class Team {
    constructor(name, coach) {
        this.name = name
        this.coach = coach
        this.players = []
    }
}

createTeamBtn.addEventListener('click', () => {
    if (teams.length === 4) {
        return
    }
    createTeam()
    if (teams.length === 2) {
        choosePlayersBtn.style.display = 'flex'
    }
})

choosePlayersBtn.addEventListener('click', () => {
    localStorage.setItem("teams", JSON.stringify(teams))


    window.location.href = "chooseRunners.html"
})

function createTeam() {
    const newTeamDisplay = teamInfoDislayTemplate.cloneNode(true)
    newTeamDisplay.style.display = 'flex'
    let newTeamName
    let newCoachName

    if (teamNameInput.value === '') {
        newTeamName = 'Team ' + (teams.length + 1)
    }
    else {
        newTeamName = teamNameInput.value
    }

    if (coachNameInput.value === '') {
        newCoachName = 'Coach ' + (teams.length + 1)
    }
    else {
        newCoachName = coachNameInput.value
    }

    newTeamDisplay.children[0].innerText = newTeamName
    newTeamDisplay.children[1].innerText = newCoachName

    teamsDisplay.appendChild(newTeamDisplay)

    teams.push(new Team (newTeamName, newCoachName))

    removeTeam(newTeamDisplay.querySelector('.remove-team-btn'))

    teamNameInput.value = ''
    coachNameInput.value = ''
}

function removeTeam(button) {
    button.addEventListener('click', () => {

        if (teams.length === 2) {
            choosePlayersBtn.style.display = 'none'
        }

        const parentDiv = button.parentNode

        const index = Array.prototype.indexOf.call(teamsDisplay.children, parentDiv);
        teams.splice(index, 1)

        parentDiv.parentNode.removeChild(parentDiv)
    })
}

function beginDraft() {}