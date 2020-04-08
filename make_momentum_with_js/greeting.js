const form = document.querySelector('.js-form'),
    input = form.querySelector('input')
    greeting = document.querySelector('.js-greetings')

const USER_LS = "currentUser",
    SHOWING_ON = 'showing'


function saveName(text) {
    localStorage.setItem(USER_LS, text)
}
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_ON);
    form.addEventListener("submit", handleSubmit)
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_ON);
    greeting.classList.add(SHOWING_ON);
    greeting.innerText = `Hello ${text}`
}

function loadName() {
    const currentName = localStorage.getItem(USER_LS);
    if (currentName == null) {
        askForName();   
    } else {
        console.log(currentName)
        paintGreeting(currentName)
    }
}

function init() {
    loadName();
}

init();