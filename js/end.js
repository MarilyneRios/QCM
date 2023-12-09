// Récupérer le score depuis le stockage local
const mostRecentScore = localStorage.getItem('mostRecentScore');

// Sélectionner l'élément dans lequel afficher le score
const finalScore = document.getElementById('finalScore');

// Afficher le score dans l'élément correspondant
finalScore.innerText = `Ton score final est de : ${mostRecentScore} points.`;
