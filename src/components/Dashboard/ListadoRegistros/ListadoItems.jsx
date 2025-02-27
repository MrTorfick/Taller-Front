import React from 'react'
import EliminarRegistro from '../Registro/EliminarRegistro'
import { useSelector } from 'react-redux';
import Spinner from '../../UI/Spinner';

export const ListadoItems = ({ registros, filtro }) => {
    const cargando = useSelector(state => state.spinner.loading);

    const filtrarRegistros = (registros) => {
        console.log(registros);
        

        if (filtro === 'Todas') {
            return registros;
        }

        const fechaActual = new Date();
        let fechaLimite;

        switch (filtro) {
            case 'Ultima semana':
                fechaLimite = new Date(fechaActual.setDate(fechaActual.getDate() - 7));
                break;

            case 'Ultimo mes':
                fechaLimite = new Date(fechaActual.setMonth(fechaActual.getMonth() - 1));
                break;
            default:
                return registros;
        }

        return registros.filter((registro) => new Date(registro.fecha) >= fechaLimite);
    }


    const registrosFiltrados = filtrarRegistros(registros);


    console.log("Registros filtrados", registrosFiltrados);

    return (
        <div>
            {cargando ? <Spinner /> : (<ul className="list-group list-group-flush">
                {registrosFiltrados.map((registro) => (
                    <li key={registro.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <span><img src={registro.imagen} alt={registro.actividad} width={45} height={45} /></span>
                            {registro.actividad} | {registro.tiempo}min | ({registro.fecha} )
                        </div>
                        <EliminarRegistro id={registro.id} />
                    </li>
                ))}
            </ul>
        )}



        </div>
    )

}
export default ListadoItems;

