import { useState } from "react";
import Card from "./components/card/Card";
import { useEffect } from "react";
function App() {
  const cards = [
   /* Exercice "chat"
   {
      titre: "Nouveau titre",
      imgSrc:
        "https://www.shutterstock.com/image-photo/funny-cat-flying-photo-playful-600nw-2315020963.jpg",
      paragraph1: "Chat 1 paragraph",
      sousTitre: "Super chat 1",
      paragraph2: "Chat 1 paragraph",
    },
    {
      titre: "Chat 2",
      imgSrc:
        "https://lemagduchat.ouest-france.fr/images/dossiers/2023-06/mini/chat-cinema-061232-650-400.jpg",
      paragraph1: "Chat 2 paragraph",
      sousTitre: "Super chat 3",
      paragraph2: "Chat 2 paragraph",
    },
    {
      titre: "Chat 3",
      imgSrc:
        "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg",
      paragraph1: "Chat 3 paragraph",
      sousTitre: "Super chat 3",
      paragraph2: "Chat 3 paragraph",
    },
    {
      titre: "Chat 4",
      imgSrc:
        "https://thumbs.dreamstime.com/b/s%C3%A9ance-ray%C3%A9e-de-chat-m%C3%A9lang%C3%A9-race-d-isolement-sur-le-blanc-ann%C3%A9es-105771323.jpg",
      paragraph1: "Chat 4 paragraph",
      sousTitre: "Super chat 4",
      paragraph2: "Chat 4 paragraph",
    },
    */
  ];
  
  //Début exercice api figurine
 const[myApi,setmyApi] = useState();
 //Essai que je comprends pas. hahaha
 /*useEffect(() => {
  fetch("https://passerelle-shop-api.julienpoirier-webdev.com/products")
    .then((res) => res.json())
    .then((json) => setmyApi(json));
 }, []);
*/
useEffect(() => {
  const getData = async () => {
    try {
      const request = await fetch(
        "https://passerelle-shop-api.julienpoirier-webdev.com/products"
      );

      const data = await request.json();
      setmyApi(data);
    } catch (error) {
      console.log(error);
    }
  };

  getData();
})
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "center",
      }}
    >
      {cards.map((oneCard) => {
        return (
          <Card
            key={oneCard.imgSrc}
            titre={oneCard.titre}
            imgSrc={oneCard.imgSrc}
            paragraph1={oneCard.paragraph1}
            paragraph2={oneCard.paragraph2}
            sousTitre={oneCard.sousTitre}
          />
        );
      })}

      <div className="card">
        <p>Hello</p>
      </div>
    </div>
  );
}

export default App;
