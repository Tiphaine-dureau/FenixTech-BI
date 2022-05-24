/* -----------------  Déclaration des variables  ----------------- */

/* Identifiants et mots de passe pour la simulation */

const emailForControler = `controleur@example.com`;
const passwordForControler = `controleur`;
const emailForCommercial = `commercial@example.com`;
const passwordForCommercial = `commercial`;

/* Variables liées au formulaire de connexion */

const form = document.getElementById('formConnection');
const email = document.getElementById('email_address');
const password = document.getElementById('password');

const error = document.getElementById('error');
error.style.color = 'red';

const regexEmail =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

/* Validation lors de la saisie de l'email */

email.addEventListener('input', (event) => {
    if (!regexEmail.test(event.target.value)) {
        error.innerText = "Le format de l'email est invalide";
    } else {
        error.innerText = '';
    }
});

/* Fonction pour effacer les inputs */

const resetInput = () => {
    email.value = '';
    password.value = '';
};

/* Fonction de redirection sur l'interface personnalisée en fonction du profil de l'utilisateur */

const connectUser = () => {
    if (
        email.value === emailForControler &&
        password.value === passwordForControler
    ) {
        window.location.href =
            'https://fenixtech-bi.herokuapp.com/accueilControleur.html';
    } else if (
        email.value == emailForCommercial &&
        password.value === passwordForCommercial
    ) {
        window.location.href =
            'https://fenixtech-bi.herokuapp.com/accueilCommercial.html';
    } else {
        event.preventDefault();
        error.innerText = `Votre email et/ou votre mot de passe sont incorrects.`;
        resetInput();
    }
};

/* Ecoute de la soumission du formulaire et appel des fonctions */

form.addEventListener('submit', (event) => {
    if (error.innerText !== '') {
        event.preventDefault();
        alert("Le formulaire contient des erreurs et n'a pas été envoyé");
        resetInput();
    } else {
        event.preventDefault();
        connectUser();
    }
});
