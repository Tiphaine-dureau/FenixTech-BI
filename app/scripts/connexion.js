/* -----------------  Déclaration des variables  ----------------- */

/* Identifiants et mots de passe pour la simulation */

const emailForController = 'controleur@example.com';
const passwordForController = 'controleur';
const emailForCommercial = 'commercial@example.com';
const passwordForCommercial = 'commercial';

/* Variables liées au formulaire de connexion */

const form = document.getElementById('formConnection');
const email = document.getElementById('email_address');
const password = document.getElementById('password');
const loginAsController = document.getElementById('login-as-controller');
const loginAsCommercial = document.getElementById('login-as-commercial');

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
        email.value === emailForController &&
        password.value === passwordForController
    ) {
        window.location.href = `${window.location.origin}/accueilControleur.html`;
    } else if (
        email.value === emailForCommercial &&
        password.value === passwordForCommercial
    ) {
        window.location.href = `${window.location.origin}/accueilCommercial.html`;
    } else {
        error.innerText = 'Votre email et/ou votre mot de passe sont incorrects.';
        resetInput();
    }
};

/* Ecoute de la soumission du formulaire et appel des fonctions */

form.addEventListener('submit', (event) => {
    console.warn("submit");
    event.preventDefault();
    if (error.innerText !== '') {
        alert("Le formulaire contient des erreurs et n'a pas été envoyé");
        resetInput();
    } else {
        connectUser();
    }
});

loginAsController.addEventListener('click', () => {
    const emailInput = document.getElementById('email_address');
    const passwordInput = document.getElementById('password');
    emailInput.value = emailForController;
    passwordInput.value = passwordForController;
});

loginAsCommercial.addEventListener('click', () => {
    const emailInput = document.getElementById('email_address');
    const passwordInput = document.getElementById('password');
    emailInput.value = emailForCommercial;
    passwordInput.value = passwordForCommercial;
});
