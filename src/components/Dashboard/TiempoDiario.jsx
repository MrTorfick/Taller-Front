import React from 'react'
import { useSelector } from 'react-redux'

const TiempoDiario = () => {

    const registros = useSelector(state => state.registro.registros);

    let totalMinutos = 0;
    const fechaActual = new Date().toISOString().split('T')[0];//Solo la fecha sin la hora, en formato UTC
    registros.forEach(element => {

        if (element.fecha === fechaActual) {

            totalMinutos += element.tiempo;
        }
    });

    return (
        <div><p className="mb-0">Hoy: <strong>{totalMinutos}</strong></p></div>
    )
}

export default TiempoDiario