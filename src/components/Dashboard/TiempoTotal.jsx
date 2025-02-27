import React from 'react'
import { useSelector } from 'react-redux'

export const TiempoTotal = () => {

    const registros = useSelector(state => state.registro.registros);

    let totalMinutos = 0;
    registros.forEach(element => {
        totalMinutos += element.tiempo;
    });


    return (
        <div> <p className="mb-2">Total: <strong>{totalMinutos} min</strong></p></div>
    )
}
