// NOTE: Question 9 about suicidal thoughts is handled differently.
const questions = [
    { text: "Poco interés o placer en hacer cosas." },
    { text: "Se ha sentido decaído(a), deprimido(a) o sin esperanzas." },
    { text: "Ha tenido dificultad para quedarse o permanecer dormido(a), o ha dormido demasiado." },
    { text: "Se ha sentido cansado(a) o con poca energía." },
    { text: "Sin apetito o ha comido en exceso." },
    { text: "Se ha sentido mal con usted mismo(a) o que es un fracaso o que ha quedado mal con usted mismo(a) o con su familia." },
    { text: "Ha tenido dificultad para concentrarse en ciertas actividades, tales como leer el periódico o ver la televisión." },
    { text: "Se ha movido o hablado tan lento que otras personas podrían haberlo notado? o lo contrario, muy inquieto(a) o agitado(a) que ha estado moviéndose mucho más de lo normal." },
    { text: "Pensamientos de que estaría mejor muerto(a) o de lastimarse de alguna manera." },
    { text: "Si marcó cualquiera de los problemas, ¿qué tanta dificultad le han dado estos problemas para hacer su trabajo, encargarse de las tareas del hogar, o llevarse bien con otras personas?" }
];

const answersFrequency = [
    { text: "Nunca", score: 0 },
    { text: "Algunos días", score: 1 },
    { text: "Más de la mitad de los días", score: 2 },
    { text: "Casi todos los días", score: 3 }
];

const answersDifficulty = [
    { text: "Ninguna dificultad", score: 0},
    { text: "Un poco de dificultad", score: 1},
    { text: "Mucha dificultad", score: 2},
    { text: "Extremada dificultad", score: 3}
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
        
        document.getElementById('progress-text').textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
        const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;
        document.getElementById('progress-bar').style.width = `${progressPercentage}%`;

        document.getElementById('question-text').textContent = question.text;
        
        const answerButtonsContainer = document.getElementById('answer-buttons');
        answerButtonsContainer.innerHTML = '';
        
        const currentAnswers = (currentQuestionIndex === questions.length - 1) ? answersDifficulty : answersFrequency;

        currentAnswers.forEach(answer => {
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
    
    console.log("Patient Data:", patientData);

    showResults();
}

function showResults() {
    contactScreen.classList.add('card-exiting');
    setTimeout(() => {
        contactScreen.classList.add('hidden');
        resultsScreen.classList.remove('hidden');
        resultsScreen.classList.add('card-entering');
        
        const totalScore = scores.slice(0, 9).reduce((sum, score) => sum + score, 0); // PHQ-9 uses all 9 items for the total score
        document.getElementById('final-score').textContent = totalScore;
        
        setTimeout(() => resultsScreen.classList.remove('card-entering'), 10);
    }, 500);
}

function sendWhatsAppMessage() {
    const psychiatristPhone = '584140260731';
    const totalScore = scores.slice(0, 9).reduce((sum, score) => sum + score, 0);
    
    let message = `*Solicitud de Cita - Pre-Evaluación Psiquiátrica*\n\n`;
    message += `Hola Eva, mi nombre es *${patientData.name}*.\n\n`;
    message += `He completado el *Cuestionario de Salud del Paciente (PHQ-9)* en la página web y me gustaría agendar una cita.\n\n`;
    message += `*Mis Datos:*\n`;
    message += `- *Puntuación PHQ-9:* ${totalScore}\n`;
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
