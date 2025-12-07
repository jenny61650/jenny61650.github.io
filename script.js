let program = {};
let currentWeek = null;
let currentDay = null;

async function loadProgram() {
    const res = await fetch("program.json");
    program = await res.json();
    renderWeekSelector();
}

function renderWeekSelector() {
    const div = document.getElementById("week-selector");
    div.innerHTML = "<h2>Select Week</h2>";
    div.className = "selector";

    Object.keys(program).forEach(week => {
        const btn = document.createElement("button");
        btn.textContent = week;
        btn.onclick = () => {
            currentWeek = week;
            renderDaySelector();
        };
        div.appendChild(btn);
    });
}

function renderDaySelector() {
    const div = document.getElementById("day-selector");
    div.innerHTML = "<h2>Select Day</h2>";
    div.className = "selector";

    Object.keys(program[currentWeek]).forEach(day => {
        const btn = document.createElement("button");
        btn.textContent = day;
        btn.onclick = () => {
            currentDay = day;
            renderWorkout();
        };
        div.appendChild(btn);
    });
}

function renderWorkout() {
    const container = document.getElementById("workout-container");
    container.innerHTML = "";

    const exercises = program[currentWeek][currentDay];

    exercises.forEach((ex, i) => {
        const card = document.createElement("div");
        card.className = "exercise";

        card.innerHTML = `
            <h3>${ex.exercise}</h3>
            <p>${ex.sets} sets × ${ex.reps}</p>
            <label>Weight Used:</label>
            <input type="number" id="w${i}" value="${loadValue(i)}" oninput="saveValue(${i})">
        `;

        container.appendChild(card);
    });
}

function saveValue(idx) {
    const key = `${currentWeek}-${currentDay}-${idx}`;
    const val = document.getElementById(`w${idx}`).value;
    localStorage.setItem(key, val);
}

function loadValue(idx) {
    const key = `${currentWeek}-${currentDay}-${idx}`;
    return localStorage.getItem(key) || "";
}

loadProgram();
