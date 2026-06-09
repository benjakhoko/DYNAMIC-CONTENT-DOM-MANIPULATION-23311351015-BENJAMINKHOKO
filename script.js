const questions = [
{
question:"What does DOM stand for?",
options:[
"Document Object Model",
"Data Object Method",
"Document Oriented Module",
"Digital Object Manager"
],
answer:"Document Object Model"
},
{
question:"Which method creates a new HTML element?",
options:[
"createNode()",
"appendChild()",
"createElement()",
"newElement()"
],
answer:"createElement()"
},
{
question:"Which method selects an element by ID?",
options:[
"querySelector()",
"getElementById()",
"findElement()",
"selectById()"
],
answer:"getElementById()"
},
{
question:"Which property inserts HTML content?",
options:[
"textContent",
"innerHTML",
"appendChild",
"createElement"
],
answer:"innerHTML"
}
];

let currentQuestion = 0;
let score = 0;

const quizContainer =
document.getElementById("quizContainer");

const scoreDisplay =
document.getElementById("score");

const questionNumber =
document.getElementById("questionNumber");

const logList =
document.getElementById("logList");

function logDOM(action){

const li =
document.createElement("li");

li.textContent =
action;

logList.prepend(li);

}

function loadQuestion(){

quizContainer.innerHTML = "";

logDOM("DELETE → Previous DOM nodes removed.");

const q = questions[currentQuestion];

const question =
document.createElement("h2");

question.className = "question";

question.textContent = q.question;

quizContainer.appendChild(question);

logDOM("CREATE → Question node created.");

q.options.forEach(optionText => {

const button =
document.createElement("button");

button.className = "option";

button.textContent = optionText;

button.addEventListener("click", () => {

document
.querySelectorAll(".option")
.forEach(btn => btn.disabled = true);

if(optionText === q.answer){

button.classList.add("correct");

score++;

scoreDisplay.textContent = score;

showFeedback("Correct Answer!", true);

logDOM("UPDATE → Score updated.");

}else{

button.classList.add("wrong");

showFeedback("Wrong Answer!", false);

}

});

quizContainer.appendChild(button);

});

}

function showFeedback(message, success){

const feedback =
document.createElement("div");

feedback.className = "feedback";

feedback.textContent = message;

feedback.style.color =
success ? "green" : "red";

quizContainer.appendChild(feedback);

logDOM("CREATE → Feedback node added.");

}

document
.getElementById("nextBtn")
.addEventListener("click", () => {

currentQuestion++;

if(currentQuestion < questions.length){

questionNumber.textContent =
currentQuestion + 1;

loadQuestion();

}else{

quizContainer.innerHTML = `

<h2>Quiz Complete!</h2>
<p>Your Final Score: ${score}/${questions.length}</p>

`;

logDOM("UPDATE → Quiz completed.");

}

});

document
.getElementById("resetBtn")
.addEventListener("click", () => {

currentQuestion = 0;
score = 0;

scoreDisplay.textContent = 0;
questionNumber.textContent = 1;

loadQuestion();

logDOM("RESET → Quiz restarted.");

});

loadQuestion();