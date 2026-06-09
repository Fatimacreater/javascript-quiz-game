import {arr} from "./array.js";

const main = document.querySelector("#main");
const next = document.querySelector("#btn");

let box = document.createElement("div");
main.appendChild(box);

let currentIndex = 0;
let score = 0;

function showQuestion() {


box.innerHTML = "";

let heading = document.createElement("h2");
heading.textContent = "JavaScript Quiz Challenge";
box.appendChild(heading);

let progress = document.createElement("span");
progress.textContent = `${currentIndex + 1}/${arr.length}`;
box.appendChild(progress);

let question = document.createElement("h2");
question.textContent = arr[currentIndex].question;
box.appendChild(question);

arr[currentIndex].options.forEach((optionText) => {

    let option = document.createElement("div");
    option.classList.add("quiz-option");

    let radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question-${currentIndex}`;
    radio.value = optionText;

    let label = document.createElement("label");
    label.textContent = optionText;

    option.appendChild(radio);
    option.appendChild(label);

    option.addEventListener("click", () => {
        radio.checked = true;
    });

    box.appendChild(option);
});


}

showQuestion();

next.addEventListener("click", () => {


let selected = document.querySelector(
    `input[name="question-${currentIndex}"]:checked`
);

if (!selected) {
    alert("⚠️ Please select an answer first");
    return;
}

if (selected.value === arr[currentIndex].answer) {
    score++;
}

currentIndex++;

if (currentIndex >= arr.length) {

    box.innerHTML = "";

    let end = document.createElement("h3");
    end.textContent = "🎉 Congratulations! You finished the quiz.";

    let result = document.createElement("div");
    result.classList.add("final-score");

    let percentage = Math.round(
        (score / arr.length) * 100
    );

    result.textContent =
        `Your Score: ${score}/${arr.length} (${percentage}%)`;

    let restartBtn = document.createElement("button");
    restartBtn.textContent = "Restart Quiz";
    restartBtn.id = "btn";

    restartBtn.addEventListener("click", () => {
        currentIndex = 0;
        score = 0;
        next.style.display = "block";
        showQuestion();
        restartBtn.remove();
    });

    box.appendChild(end);
    box.appendChild(result);
    box.appendChild(restartBtn);

    next.style.display = "none";
    return;
}

showQuestion();


});
