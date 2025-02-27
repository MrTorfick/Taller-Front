import React from 'react'

const Select = ({ opciones, onChange}) => {
    return (
        <select className="form-select" onChange={onChange}>
            <option value="">Seleccione una opcion</option>

            {opciones.map((opcion) => (
                <option key={opcion.id} value={opcion.id}>{opcion.nombre}</option>))}
        </select>
    )
}

export default Select