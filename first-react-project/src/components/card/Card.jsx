import classes from "./Card.module.css";

console.log(classes);

function Card({ titre, imgSrc, paragraph1, paragraph2, sousTitre }) {
  return (
    <div className={classes.card}>
      <h2>{titre}</h2>
      <img src={imgSrc} alt="Une image de chat" />
      <div>
        <p>{paragraph1}</p>
        <h3>{sousTitre}</h3>
        <p>{paragraph2}</p>
      </div>
    </div>
  );
}

export default Card;
