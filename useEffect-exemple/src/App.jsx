import React, { useState, useEffect } from 'react';

function App() {
 // Initialise l'état pour stocker les données du formulaire
 const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    confirmMotDePasse: '', // Ajout du champ de confirmation
 });

 // Initialise l'état pour suivre si le formulaire a été soumis
 const [isSubmitted, setIsSubmitted] = useState(false);

 // Fonction pour gérer les changements dans les champs du formulaire
 // Elle met à jour l'état formData avec les nouvelles valeurs
 const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 // Fonction pour vérifier si les mots de passe correspondent
 // Elle compare les valeurs des champs motDePasse et confirmMotDePasse
 const checkPasswordsMatch = () => {
    return formData.motDePasse === formData.confirmMotDePasse;
 };

 // Fonction pour vérifier si tous les champs du formulaire sont remplis
 // Elle vérifie que tous les champs ont une valeur non vide
 const checkFormIsValid = () => {
    return formData.nom && formData.prenom && formData.email && formData.motDePasse && formData.confirmMotDePasse;
 };

 // Fonction pour gérer la soumission du formulaire
 // Elle vérifie si le formulaire est valide et si les mots de passe correspondent
 // Si les conditions sont remplies, elle met à jour l'état isSubmitted et stocke les données dans le localStorage
 const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (checkFormIsValid() && checkPasswordsMatch()) {
      setIsSubmitted(true); // Met à jour l'état pour afficher le message de confirmation
      // Stocker les données dans le localStorage
      localStorage.setItem('formData', JSON.stringify(formData));
    } else {
      alert('Veuillez remplir tous les champs et assurez-vous que les mots de passe correspondent.');
    }
 };

 // Utilise l'effet pour surveiller les changements dans l'état formData
 // Affiche les données du formulaire dans la console chaque fois qu'elles changent
 useEffect(() => {
    console.log(formData);
 }, [formData]);

 return (
  <>
  <h1 className="text-center my-5">Formulaire d'inscription</h1>
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className='p-5 border rounded-5'>
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">Nom</label>
              <input type="text" className="form-control" id="nom" name="nom" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="prenom" className="form-label">Prénom</label>
              <input type="text" className="form-control" id="prenom" name="prenom" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="motDePasse" className="form-label">Mot de passe</label>
              <input type="password" className="form-control" id="motDePasse" name="motDePasse" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmMotDePasse" className="form-label">Confirmer le mot de passe</label>
              <input type="password" className="form-control" id="confirmMotDePasse" name="confirmMotDePasse" onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Soumettre</button>
          </form>
          {isSubmitted && <div className="alert alert-success mt-3" role="alert">
            Votre formulaire a été soumis avec succès !
          </div>}
        </div>
      </div>
    </div>
    </>
 );
}

export default App;