// Sélection des éléments HTML requis
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

// Variables pour suivre l'état du jeu
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Prise de la Bastille ?',
        choice1: '15 août 1789',
        choice2: '14 juillet 1789',
        choice3: '11 juillet 1789',
        choice4: '14 juillet 1788',
        answer: '14 juillet 1789',
    },
    {
        question: `Abolition des privilèges et fin de l’Ancien Régime ?`,
        choice1: `4 août 1789`,
        choice2: `8 août 1789`,
        choice3: `1 août 1789`,
        choice4: `5 août 1789`,
        answer: `4 août 1789`,
    },
    {
        question: ` Déclaration des droits de l’homme ?`,
        choice1: `26 août 1787`,
        choice2: `26 août 1789`,
        choice3: `24 août 1789`,
        choice4: `26 août 1788`,
        answer: `26 août 1789`,
    },
    {
        question: ` Monarchie constitutionnelle`,
        choice1: `1789-1799`,
        choice2: `1788-1792`,
        choice3: `1789-1791`,
        choice4: `1789-1792`,
        answer: `1789-1792`,
    },
    {
        question: `La Convention abolit l’esclavage ?`,
        choice1: `14 février 1794`,
        choice2: `14 mars 1794`,
        choice3: `14 janvier 1794`,
        choice4: `14 avril 1794`,
        answer: `14 février 1794`,
    },
    {
        question: ` Sacre de Napoléon et début de l’Empire ?`,
        choice1: `10 décembre 1804`,
        choice2: `10 novembre 1799`,
        choice3: `2 novembre 1804`,
        choice4: `2 décembre 1804`,
        answer: `2 décembre 1804`,
    },
    {
        question: ` La fuite de Varennes?`,
        choice1: `21 juillet 1789`,
        choice2: `21 juillet 1791`,
        choice3: `14 juillet 1789`,
        choice4: `21 juin 1789`,
        answer: `21 juin 1789`,
    },
    {
        question: ` Proclamation de la République?`,
        choice1: `10 décembre 1790`,
        choice2: `10 septembre 1799 `,
        choice3: `22 septembre 1792`,
        choice4: `2 décembre 11791`,
        answer: `22 septembre 1792`,
    },
    {
        question: ` Prise des Tuleries ?`,
        choice1: `10 août 1792`,
        choice2: `114novembre 1799`,
        choice3: `12 novembre 1795`,
        choice4: `2 décembre 1790`,
        answer: `10 août 1792`,
    },
    {
        question: ` Mort de Robespierre ?`,
        choice1: `6 juin 1794`,
        choice2: `10 novembre 1794`,
        choice3: `27 juillet 1794`,
        choice4: `22 juillet 1794`,
        answer: `27 juillet 1794`,
    },

]

// Constantes pour le score et le nombre maximum de questions
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

// Fonction pour démarrer le jeu
const startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

// Fonction pour obtenir une nouvelle question
const getNewQuestion = () => {
    // Vérifier si toutes les questions ont été posées ou si le nombre maximum de questions est atteint
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        // Enregistrer le score et rediriger vers la page de fin
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('/end.html');
    }

    // Incrémenter le compteur de question et mettre à jour l'affichage de la progression
    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    // Sélectionner une question aléatoire parmi les questions disponibles
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;//

    // Afficher les choix pour la question actuelle
    choices.forEach(choice => {
        //const number = choice.dataset['number']; // ou choice.dataset['number']
        const number = parseInt(choice.dataset.number);
        choice.innerText = currentQuestion['choice' + number];
    });

    // Retirer la question sélectionnée des questions disponibles
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;

    // Ajouter des console.log() pour suivre le processus
    console.log('Question Counter:', questionCounter);
    console.log('Current Question:', currentQuestion);
    console.log('Available Questions:', availableQuestions);
};

// Écouter les clics sur les choix et gérer les réponses
choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = parseInt(selectedChoice.dataset.number);
       // const selectedAnswer = selectedChoice.dataset['number'];// ou dataset['number']

       console.log('Choix sélectionné :', selectedAnswer);

        // Vérifier si la réponse sélectionnée est correcte ou incorrecte
        let classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';

        console.log('Classe appliquée :', classToApply); 

        // Si la réponse est correcte, incrémenter le score
        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        // Appliquer une classe pour indiquer si la réponse est correcte ou incorrecte
        selectedChoice.parentElement.classList.add(classToApply);

        // Retarder l'affichage de la prochaine question
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

// Fonction pour incrémenter le score
 incrementScore = num => {
    score += num;
    scoreText.innerText = score;
    console.log('Score incrémenté de :', num);
};

// Démarrer le jeu au chargement de la page
startGame();