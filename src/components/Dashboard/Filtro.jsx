import React from 'react'
import Select from '../UI/Select'

let Opciones = [
    { id: 1, nombre: "Ultima semana" },
    { id: 2, nombre: "Ultimo mes" },
    { id: 3, nombre: "Todas" },
]

const Filtro = ({ filtro }) => {

    const obtenerOpcion = (e) => {
        const id = e.target.value
        const opcion = Opciones.find(opcion => opcion.id == id)
        if (opcion) {//Evalua si opcion encontro un objeto
            filtro(opcion.nombre)
        }
    }


    return (
        <div>
            <Select opciones={Opciones} onChange={obtenerOpcion} />
        </div>
    )
}

export default Filtro