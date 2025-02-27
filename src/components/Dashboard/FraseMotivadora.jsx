import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const FraseMotivadora = () => {

  const registros = useSelector(state => state.registro.registros);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    let totalMinutosHoy = 0;
    let totalMinutosAyer = 0;
    const fechaActual = new Date().toISOString().split('T')[0];
    const fechaAyer = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];

    registros.forEach(element => {
      if (element.fecha.split('T')[0] === fechaActual) {
        totalMinutosHoy += element.tiempo;
      }
      if (element.fecha.split('T')[0] === fechaAyer) {
        totalMinutosAyer += element.tiempo;
      }
    });

    setMensaje(totalMinutosHoy == 0 && totalMinutosAyer == 0 ? "" : totalMinutosHoy > totalMinutosAyer ? "¡Bien hecho!" : "¡Que no decaiga!");
  }, [registros]);

  return (

    <div className={`text-center alert ${mensaje == "" ? null : mensaje == "¡Bien hecho!" ? "alert-success" : "alert-warning"}`}>
      {mensaje}
    </div>
  )
}

export default FraseMotivadora