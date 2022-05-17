let currentDocId;
/**
 * Méthode fetch pour appeler notre api qui appelle elle même la base de données => à garder en exemple
 */
fetch(`${window.location.origin}/ping`, { method: 'GET' }).then((response) => {
  return response.json().then(function (data) {
    currentDocId = data._id;
    document.getElementById('testDatabase').innerText = data["size"];
  });
})

const updateButton = document.getElementById('updateButton')
console.warn(updateButton);
document.getElementById('updateButton').addEventListener('click', () => {
  updateTest();
})

/**
 * TODO
 */
function updateTest() {
  const distance = document.getElementById('distance').value;
  const carburant = document.getElementById('carburant').value;
  const formData = {
    distance,
    carburant,
  };
  fetch(`${window.location.href}simulator/${currentDocId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then((response) => {
    return response.json().then(function (data) {
      document.getElementById('testDatabase').innerText = data["size"];
    });
  })
}

