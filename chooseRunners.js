const grid = document.querySelector(".runners-grid")
const filterBtns = document.querySelectorAll(".filter-btn")

let runners = []
let filters = {
    "Sub-Varsity": true,
    "JV 7-9": true,
    "JV 10-12": true,
    "Varsity": true
}

fetch("runners.json")
  .then(response => response.json())
  .then(data => {
    runners = data;
    displayRunners(); // call function to show them in the grid
  })
  .catch(error => console.error("Error loading runners:", error));


function displayRunners() {
    grid.innerHTML = ''

    runners.forEach(runner => {
        if (runner.group.some(g => filters[g])) {
            const newRunner = document.createElement('div')
            newRunner.classList.add('runner')
            newRunner.innerText = runner.name

            if (!runner.available) [
                newRunner.classList.add('excluded')
            ]

            newRunner.addEventListener('click', () => {
                runner.available = !runner.available
                newRunner.classList.toggle('excluded')
            })

            grid.appendChild(newRunner)
        }
    })
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterGroup = btn.dataset.group
        const isActive = !filters[filterGroup]

        filters[filterGroup] = isActive
        btn.classList.toggle('active')

        displayRunners()
    })
})

document.querySelector('.nav-btn').addEventListener('click', () => {
    const draftRunners = runners.filter(runner => {
        const inActiveGroup = runner.group.some(g => filters[g])
        return inActiveGroup && runner.available
    })

    localStorage.setItem("draftRunners", JSON.stringify(draftRunners))

    window.location.href = 'draft.html'
})

