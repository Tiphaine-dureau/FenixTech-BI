/**
 * Appelle l'API GET cc6Form avec l'année courante en paramètre
 * @returns {Promise<any>} Les données du formulaire CC6 de l'année courante
 */
async function getCC6Form() {
  const todayYear = new Date().getFullYear();
  return fetch(`${window.location.origin}/cc6Form?year=${todayYear}`, { method: 'GET' }).then((response) => {
    return response.json().then((data) => data);
  })
}

async function putCC6Form(formData) {
  const id = formData._id;
  delete formData._id;
  return fetch(`${window.location.origin}/cc6Form/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then((response) => {
    return response.json().then((data) => data);
  })
}