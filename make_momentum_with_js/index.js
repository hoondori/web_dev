
// title.innerHTML = "Hi my name is";
// title.style.color = "red";
// console.dir(document);
const title = document.querySelector('#title');

const BASE_CLASS = "clicked"

function handleClick(event) {
    
    // const hasClass = title.classList.contains(BASE_CLASS)
    // if (!hasClass) {
    //     title.classList.add(BASE_CLASS);
    // } else {
    //     title.classList.remove(BASE_CLASS);
    // }
    title.classList.toggle(BASE_CLASS);
}

function init(event) {
    title.addEventListener("click", handleClick);
}

init();


