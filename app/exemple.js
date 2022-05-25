let currentDocId;

document.addEventListener("DOMContentLoaded", function () {
  init();
});

/**
 * Initialise les évènements du DOM et les premiers appels à l'API (get)
 */
function init() {
  attachEventHandlers();
  initFetching();
}

/**
 * Au click gère l'ajout des valeurs et la propagation
 */
function attachEventHandlers() {
  document.getElementById('updatePutBdd').addEventListener('click', (e) => {
    onEditFormValidation();
    e.preventDefault();
  })
  document.getElementById('updatePostBdd').addEventListener('click', (e) => {
    onCreationFormValidation();
    e.preventDefault();
  })
}

/**
 * Enregistre les données saisies dans un objet et envoie ces données pour modifier la bdd avec l'api fetch et la méthode PUT
 */
function onEditFormValidation() {
  // TODO show spinner
  const distance = getDistanceEl().value;
  const carburant = getCarburantEl().value;
  const formData = {
    distance,
    carburant,
  };

  putForm(formData);
}

/**
 * Enregistre les données saisies dans un objet et envoie ces données pour créer un nouveau document dans la bdd avec l'api fetch et la méthode POST
 */
function onCreationFormValidation() {
  // TODO show spinner
  const numberTollgate = getNumberTollgate().value;
  const totalPriceTollgate = getTotalPriceTollgate().value;
  const formTwo = {
    numberTollgate,
    totalPriceTollgate,
  };

  postForm(formTwo);
}