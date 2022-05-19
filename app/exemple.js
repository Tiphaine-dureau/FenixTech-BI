let currentDocId;

document.addEventListener("DOMContentLoaded", function(event) {
  init();
});

function init() {
  document.getElementById('updatePutBdd').addEventListener('click', (e) => {
    updateTest();
    e.preventDefault();
  })
}

function getDistanceEl() {
  return document.getElementById('distance');
}

function getCarburantEl() {
  return document.getElementById('carburant');
}

/**
 * Méthode fetch pour appeler notre api qui appelle elle même la base de données => à garder en exemple
 */
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

function updateTest() {
  // TODO show spinner
  const distance = getDistanceEl().value;
  const carburant = getCarburantEl().value;
  const formData = {
    distance,
    carburant,
  };

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

