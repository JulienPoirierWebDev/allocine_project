import React, { useEffect, useState } from "react";

// Composant principal de l'application React
function App() {
 // État pour stocker les données récupérées de l'API
 const [ApiData, SetApiData] = useState(null);

 // Effet pour récupérer les données de l'API au montage du composant
 useEffect(() => {
    // Fonction asynchrone pour récupérer les données de l'API
    const getData = async () => {
      // Effectue une requête fetch pour récupérer les données de l'API
      const response = await fetch(
        "https://passerelle-shop-api.julienpoirier-webdev.com/products"
      );
      // Convertit la réponse en JSON
      const data = await response.json();
      // Met à jour l'état avec les données récupérées
      SetApiData(data);
    };
    // Appelle la fonction getData
    getData();
 }, []);

 // JSX pour rendre le composant
 return (
    <>
      <div className="row d-flex gap-1 flex-wrap">
        {/* Vérifie si ApiData est non null et mappe chaque élément pour le rendre */}
        {ApiData && ApiData.map((item, index) => (
          <div className="container my-5 col-md-4 col-sm-6 border rounded-5 d-flex" style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)", backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "10px", border: "1px solid #dee2e6"}}>
            <div key={index} style={{ width: "100%" }}>
              <h3 className="text-center fw-bolder my-3">{item.name}</h3>
              <h5 className="text-center mt-3">{item.category.name}</h5>
              <p className="text-center mb-5" style={{ color: "gray" }}><em>{item.category.description}</em></p>
              <p className="text-start my-3">{item.description}</p>
              <p style={{ color: "gray" }}>Stock disponible : {item.stock}</p>
              <p className="text-end my-3 fs-5 fw-bolder"><span className="rounded-5 p-2 bg-dark text-white">{item.price} €</span></p>
              <img src={item.mainImageURL} alt="" className="img-fluid" style={{ width: "100%", height: "auto", borderRadius: "10px", boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)", border: "1px solid #dee2e6", objectFit: "cover", objectPosition: "center", display: "block", margin: "auto" }} />
            </div>
          </div>
        ))}
      </div>
    </>
 );
}

export default App;