import React from "react";

const NoEncontrado404 = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-1 text-danger fw-bold">404</h1>
      <h2 className="text-secondary">Página no encontrada</h2>
      <a href="/" className="btn btn-primary mt-3">
        Volver al inicio
      </a>
    </div>
  );
};

export default NoEncontrado404;
