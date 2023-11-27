const question =document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText =document.querySelector('#progressText');
const scoreText =document.querySelector('#score');
const progressBarFull =document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let avaitlableQuestion = []

let questions = [
    {
        question: ` Prise de la Bastille ?`,
        choice1: `15 août 1789`,
        choice2: `14 juillet 1789`,
        choice3: `11 juillet 1789`,
        choice4: `14 juillet 1788`,
        answer: `14 juillet 1789`,
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
        choice1: `1789-1799 `,
        choice2: `1788-1792 `,
        choice3: `1789-1791 `,
        choice4: `1789-1792 `,
        answer: `1789-1792 `,
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
        choice1: `10 décembre 1804 `,
        choice2: `10 novembre 1799 `,
        choice3: `2 novembre 1804 `,
        choice4: `2 décembre 1804 `,
        answer: `2 décembre 1804 `,
    },

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

// Fonction pour démarrer le jeu
starGame = () => {
    // Réinitialiser le compteur de questions et le score
    questionCounter = 0
    score = 0
    // Copier toutes les questions disponibles
    avaitlableQuestion =[...questions]
    // Obtenir une nouvelle question
    getNewQuestion()
}

// Fonction pour obtenir une nouvelle question
getNewQuestion= ()=> {
    // Si toutes les questions ont été posées ou si le compteur de questions dépasse le maximum, enregistrer le score et rediriger vers la page de fin
    if(avaitlableQuestion.length === 0 || questionCounter > MAX){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }
    // Incrémenter le compteur de questions
    questionCounter++
    // Mettre à jour le texte de progression
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    // Mettre à jour la barre de progression
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) *100}%`

    // Sélectionner une question aléatoire parmi les questions disponibles
    const questionIndex = Math.floor(Math.random()* avaitlableQuestion.length)
    currentQuestion = avaitlableQuestion[questionIndex]
    // Afficher la question sélectionnée
    question.innerHTML = currentQuestion.question

    // Afficher les choix pour la question actuelle
    choices.array.forEach(choice => {
        const number = choice.dataset('number')
        choice.innerText = currentQuestion['choice' + number]
    });
    // Supprimer la question sélectionnée des questions disponibles
    avaitlableQuestion.splice(questionIndex, 1)
}