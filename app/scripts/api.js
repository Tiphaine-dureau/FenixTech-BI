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

/**
 * Modifie les données de la base de données avec les données remplies
 * @param formData
 * @returns {Promise<any>}
 */
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

/**
 * Créer dans la base de donnée un nouveau document avec les données remplies
 * @param formData
 * @returns {Promise<any>}
 */
async function postVForm(formData) {
  return fetch(`${window.location.origin}/vForm`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then((response) => {
    return response.json().then((data) => data);
  })
}