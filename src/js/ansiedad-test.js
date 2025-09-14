const questions = [
    { text: "Adormecimiento o cosquilleo." },
    { text: "Sentirse acalorado." },
    { text: "Piernas tambaleantes." },
    { text: "Incapacidad para relajarme." },
    { text: "Temor de que suceda lo peor." },
    { text: "Mareo." },
    { text: "Taquicardia." },
    { text: "Inquietud." },
    { text: "Aterrorizado." },
    { text: "Nervioso." },
    { text: "Sensación de ahogo." },
    { text: "Manos temblorosas." },
    { text: "Escalofríos." },
    { text: "Temor a perder el control." },
    { text: "Dificultad para respirar." },
    { text: "Temor a morir." },
    { text: "Asustado." },
    { text: "Indigestión o molestias estomacales." },
    { text: "Desmayo." },
    { text: "Rostro sonrojado." },
    { text: "Sudoración (no debido a calor)." }
];

const answers = [
    { text: "No ha estado presente", score: 0 },
    { text: "Levemente, no me ha molestado mucho", score: 1 },
    { text: "Moderadamente, ha sido molesto, pero lo he podido soportar", score: 2 },
    { text: "Severamente, difícilmente lo he soportado", score: 3 }
];

let currentQuestionIndex = 0;
let scores = [];
let patientData = {};

const startScreen = document.getElementById('start-screen');
const testScreen = document.getElementById('test-screen');
const contactScreen = document.getElementById('contact-screen');
const resultsScreen = document.getElementById('results-screen');
const questionContainer = document.getElementById('question-container');

const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-btn');
const contactForm = document.getElementById('contact-form');
const restartBtn = document.getElementById('restart-btn');
const whatsappBtn = document.getElementById('whatsapp-btn');

startBtn.addEventListener('click', startTest);
backBtn.addEventListener('click', goBack);
contactForm.addEventListener('submit', handleContactSubmit);
whatsappBtn.addEventListener('click', sendWhatsAppMessage);
restartBtn.addEventListener('click', restartTest);

function startTest() {
    startScreen.classList.add('card-exiting');
    setTimeout(() => {
        startScreen.classList.add('hidden');
        testScreen.classList.remove('hidden');
        testScreen.classList.add('card-entering');
        displayQuestion();
        setTimeout(() => testScreen.classList.remove('card-entering'), 10);
    }, 500);
}

function displayQuestion() {
    // Control visibility of the back button
    if (currentQuestionIndex > 0) {
        backBtn.classList.remove('invisible');
    } else {
        backBtn.classList.add('invisible');
    }

    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        
        document.getElementById('progress-text').textContent = `Síntoma ${currentQuestionIndex + 1} de ${questions.length}`;
        const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;
        document.getElementById('progress-bar').style.width = `${progressPercentage}%`;

        document.getElementById('question-text').textContent = question.text;
        
        const answerButtonsContainer = document.getElementById('answer-buttons');
        answerButtonsContainer.innerHTML = '';
        
        answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer.text;
            button.classList.add('w-full', 'bg-white', 'border', 'border-gray-200', 'hover:bg-gray-100', 'hover:border-gray-300', 'text-gray-700', 'font-semibold', 'py-4', 'px-4', 'rounded-xl', 'transition-colors', 'duration-200', 'text-left', 'sm:text-center', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2', 'focus:ring-verde-oscuro/50');
            button.onclick = () => selectAnswer(answer.score);
            answerButtonsContainer.appendChild(button);
        });

    } else {
        showContactForm();
    }
}

function selectAnswer(score) {
    scores.push(score);
    currentQuestionIndex++;
    displayQuestion();
}

function goBack() {
    if (currentQuestionIndex > 0) {
        scores.pop();
        currentQuestionIndex--;
        displayQuestion();
    }
}

function showContactForm() {
    testScreen.classList.add('card-exiting');
    setTimeout(() => {
        testScreen.classList.add('hidden');
        contactScreen.classList.remove('hidden');
        contactScreen.classList.add('card-entering');
        setTimeout(() => contactScreen.classList.remove('card-entering'), 10);
    }, 500);
}

function handleContactSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    patientData = Object.fromEntries(formData.entries());
    
    // In a real application, you would send this to your server (e.g., Supabase).
    console.log("Patient Data:", patientData);

    showResults();
}

function showResults() {
    contactScreen.classList.add('card-exiting');
    setTimeout(() => {
        contactScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        resultsScreen.classList.add('card-entering');
        
        const totalScore = scores.reduce((sum, score) => sum + score, 0);
        document.getElementById('final-score').textContent = totalScore;
        
        setTimeout(() => resultsScreen.classList.remove('card-entering'), 10);
    }, 500);
}

function sendWhatsAppMessage() {
    const psychiatristPhone = '584140260731'; // Número actualizado
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    
    let message = `*Solicitud de Cita - Pre-Evaluación Psiquiátrica*\n\n`;
    message += `Hola Eva, mi nombre es *${patientData.name}*.\n\n`;
    message += `He completado el *Inventario de Ansiedad de Beck* en la página web y me gustaría agendar una cita.\n\n`;
    message += `*Mis Datos:
`;
    message += `- *Puntuación de Ansiedad:* ${totalScore}\n`;
    message += `- *Email:* ${patientData.email}\n`;
    message += `- *Teléfono:* ${patientData.phone}\n\n`;
    message += `Quedo atento/a a tu respuesta para coordinar. ¡Gracias!`;

    const whatsappUrl = `https://wa.me/${psychiatristPhone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
}

function restartTest() {
    currentQuestionIndex = 0;
    scores = [];
    patientData = {};
    resultsScreen.classList.add('card-exiting');
     setTimeout(() => {
        resultsScreen.classList.add('hidden');
        startScreen.classList.remove('hidden','card-exiting');
        startScreen.classList.add('card-entering');
        document.getElementById('progress-bar').style.width = `0%`;
        document.getElementById('contact-form').reset();
        setTimeout(() => startScreen.classList.remove('card-entering'), 10);
    }, 500);
}
