import React from 'react';
import { useSelector } from 'react-redux';
import Select from '../../UI/Select';


const ObtenerActividades = ({ setIdSeleccionado }) => {

    const actividades = useSelector(state => state.actividad.actividades);

    const obtenerIdActividad = (e) => {
        const id = e.target.value;
        if (id === "")
            setIdSeleccionado(null);
        else
            setIdSeleccionado(id);
    }

    return (
        <div>
            <Select opciones={actividades} onChange={obtenerIdActividad} />
        </div>
    )



}
export default ObtenerActividades