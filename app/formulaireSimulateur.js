/** SIMULATION DU RENVOI VERS LA PAGE DE SIMULATION DU COUT DE REVIENT APRES ENREGISTREMENT DES DONNEES EN BDD ET CALCULS */

/* Variables liées au formulaire simulateur véhicule */

const form = document.getElementById('formVehicule');

/* Ecoute de la soumission du formulaire et appel des fonctions redirection vers la page simulateur de cout de cout de revient */

form.addEventListener('submit', (event) => {
    event.preventDefault();
    window.location.href =
        'https://fenixtech-bi.herokuapp.com/SimulateurCoutDeRevient.html';
    console.log('Changement de page');
});
