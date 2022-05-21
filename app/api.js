/**
 * Utilisation de l'Api Fetch avec la méthode POST pour ajouter les données saisies dans un nouveau document de la bdd
 * @param formTwo
 */
function postForm(formTwo) {
  fetch(`${window.location.origin}/simulator`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formTwo)
  }).then((response) => {
    return response.json()
      .then(function (data) {
        getNumberTollgate().value = data.numberTollgate;
        getTotalPriceTollgate().value = data.totalPriceTollgate;
        // TODO hide spinner
        // TODO show success toast
      });
  })
}

/**
 * Utilisation de l'api Fetch avec la méthode PUT pour que les données saisies modifient les données de la bdd
 * @param formData
 */
function putForm(formData) {
  fetch(`${window.location.origin}/simulator/${currentDocId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then((response) => {
    return response.json()
      .then(function (data) {
        getDistanceEl().value = data.distance;
        getCarburantEl().value = data.carburant;
        // TODO hide spinner
        // TODO show success toast
      });
  })
}

/**
 * Récupération de l'id courant
 * Récupération des données de la bdd pour les afficher
 */
function initFetching() {
  fetch(`${window.location.origin}/ping`, { method: 'GET' }).then((response) => {
    return response.json().then(function (data) {
      document.getElementById('testDatabase').innerText = data.size;
    });
  })

  fetch(`${window.location.origin}/simulator`, { method: 'GET' }).then((response) => {
    return response.json().then(function (data) {
      currentDocId = data._id;
      getCarburantEl().value = data.carburant;
      getDistanceEl().value = data.distance;
    });
  })
}