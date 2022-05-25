/** SIMULATION DU RENVOI VERS LA PAGE DE SIMULATION DU COUT DE REVIENT APRES ENREGISTREMENT DES DONNEES EN BDD ET CALCULS */

/* Variables liées au formulaire simulateur véhicule */

const form = document.getElementById('formVehicule');

/**
 * Ecoute de la soumission du formulaire et appel des fonctions redirection vers la page simulateur de cout de cout de revient
 * A la validation du formulaire envoie les données saisie dans la base de données
 */
form.addEventListener('submit', (event) => {
  event.preventDefault();
  onFormVClicked().then(() => {
    window.location.href = `${window.location.origin}/SimulateurCoutDeRevient.html`;
  })
});

/**
 *
 * @returns {Promise<*>}
 */
async function onFormVClicked() {
  const formData = {
    'description_du_vehicule': document.getElementById('description_du_vehicule').value,
    'kilometrage_annuel_moyen': document.getElementById('kilometrage_annuel_moyen').value,
    'kilometres_en_charge': document.getElementById('kilometres_en_charge').value,
    'nombre_de_vehicule_tracte': document.getElementById('nombre_de_vehicule_tracte').value,
    'nbr_de_jours_d_exploitation_du_vehicule': document.getElementById('nbr_de_jours_d_exploitation_du_vehicule').value,
    'unite_de_chargement': document.getElementById('unite_de_chargement').value,
    'capacite_de_chargement': document.getElementById('capacite_de_chargement').value,
    'coefficient_d_utilisation_de_cette_capacite': document.getElementById('coefficient_d_utilisation_de_cette_capacite').value,
    'conso_gazoil_pour_100_km': document.getElementById('conso_gazoil_pour_100_km').value,
    'prix_gasoil_route': document.getElementById('prix_gasoil_route').value,
    'part_approvisionnement_citerne': document.getElementById('part_approvisionnement_citerne').value,
    'prix_moyen_gasoil_citerne': document.getElementById('prix_moyen_gasoil_citerne').value
  }
  return postVForm(formData);
}