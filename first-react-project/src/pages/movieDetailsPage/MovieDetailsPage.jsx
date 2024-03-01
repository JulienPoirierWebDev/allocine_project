import React from "react";
import { useParams } from "react-router-dom";

// import { Container } from './styles';

function MovieDetailsPage() {
  const { id } = useParams();
  return (
    <>
      <p>Vous recherchez le film avec l'id {id}</p>
    </>
  );
}

export default MovieDetailsPage;
