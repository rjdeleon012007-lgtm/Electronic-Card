const quizData = [
    {
        question: "Ilang taon na ako Ma'am?",
        choices: ["18", "19", "20", "21"], 
        answer: "19",
        reason: "mukha lang akong matanda ma'am pero 19 palang po ako HAHAHA"
    },
    {
        question: "Ano ang magiging grades ko ma'am? (1, 2, 3, 4, 5)",
        answer: "1",
        reason: "Ay waoooooo arigathanks ma'am!"
    },
    {
        question: "Babagsak ba ako ma'am?",
        choices: ["Parang Oo?", "Baka lang", "Hindi", "Ewan ko"], 
        answer: "hindi",
        reason: "Sabi na ehh galing ko talaga!"
    },
    {
        question: "Ano first name ng pinaka favorite mo na student ma'am?",
        answer: "reynante",
        reason: "Ay sorry guys ako lang too!"
    }
];

let currentStep = 0;

function startQuiz() {
    document.getElementById('questionScreen').classList.add('hidden');
    document.getElementById('quizScreen').classList.remove('hidden');
    loadQuizItem();
}

function loadQuizItem() {
    if (currentStep < quizData.length) {
        const currentItem = quizData[currentStep];
        document.getElementById('quizTitle').innerText = `Question #${currentStep + 1}`;
        document.getElementById('questionText').innerText = currentItem.question;
        
        const inputGroup = document.getElementById('inputGroup');
        const choicesContainer = document.getElementById('choicesContainer');
        const secretClue = document.getElementById('secretClue');
        const clueText = document.getElementById('clueText');

        if (currentItem.choices && currentItem.choices.length > 0) {
            inputGroup.classList.add('hidden');
            secretClue.classList.add('hidden');
            choicesContainer.classList.remove('hidden');

            choicesContainer.innerHTML = "";
            currentItem.choices.forEach(choice => {
                const btn = document.createElement('button');
                btn.className = "choice-btn";
                btn.innerText = choice;
                btn.onclick = () => checkChoiceAnswer(choice);
                choicesContainer.appendChild(btn);
            });
        } else {
            choicesContainer.classList.add('hidden');
            inputGroup.classList.remove('hidden');
            secretClue.classList.remove('hidden');
           
            clueText.innerText = currentItem.answer;

            inputGroup.innerHTML = `
                <input type="text" id="userAnswer" placeholder="I-type ang iyong sagot dito..." onkeypress="handleKeyPress(event)">
                <div id="errorMsg" class="error-msg"></div>
                <button onclick="checkAnswer()">I-submit ang Sagot 🔓</button>
            `;
            document.getElementById('userAnswer').focus();
        }
    } else {
        document.getElementById('quizScreen').classList.add('hidden');
        document.getElementById('successScreen').classList.remove('hidden');
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
}

function checkChoiceAnswer(selectedChoice) {
    const correctAnswer = quizData[currentStep].answer.toLowerCase();
    
    if (selectedChoice.toLowerCase() === correctAnswer) {
        showReasonScreen();
    } else {
        alert("Mali napili mo ma'am, anjan na yung tamang sagot");
    }
}

function checkAnswer() {
    const userInputValue = document.getElementById('userAnswer').value.trim().toLowerCase();
    const correctAnswer = quizData[currentStep].answer.toLowerCase();
    const errorMsg = document.getElementById('errorMsg');

    if (userInputValue === correctAnswer) {
        showReasonScreen();
    } else {
        errorMsg.innerText = "Ay sayang ma'am mali, try nyo ulit ma'am";
    }
}

function showReasonScreen() {
    const currentReason = quizData[currentStep].reason;
    document.getElementById('quizTitle').innerText = `Dahilan #${currentStep + 1} ❤️`;
    document.getElementById('questionText').innerText = currentReason;
    
    document.getElementById('secretClue').classList.add('hidden');
    document.getElementById('choicesContainer').classList.add('hidden');
    
    const btnText = (currentStep === quizData.length - 1) 
        ? "Buksan ang Sobre 💌" 
        : "Next question please 😉➡️";

    const inputGroup = document.getElementById('inputGroup');
    inputGroup.classList.remove('hidden');
    inputGroup.innerHTML = `<button onclick="nextStep()">${btnText}</button>`;
}

function nextStep() {
    currentStep++;
    loadQuizItem();
}

function openEnvelope() {
    const container = document.getElementById('envelopeContainer');
    const letterBox = document.getElementById('letterBox');
    
    container.classList.add('open');
    
    setTimeout(() => {
        container.style.display = 'none';
        letterBox.classList.remove('hidden');
    }, 500);
}

function moveNo() {
    const noBtn = document.getElementById('noBtn');
    const x = Math.random() * 160 - 80;
    const y = Math.random() * 80 - 40;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-bg');
    const icons = ['❤️', '</>', '💻', '✨', '⚡'];
    heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
    heart.style.fontSize = (Math.random() * 15 + 12) + 'px';
    document.body.appendChild(heart);

    setTimeout(() => { heart.remove(); }, 6000);
}
setInterval(createHeart, 400);