import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { eliminarRegistro } from '../../../features/registroSlice';
import Spinner from '../../UI/Spinner'
import { spinnerCargando } from '../../../features/spinnerSlice';

const EliminarRegistro = ({ id }) => {

    const cargando = useSelector(state => state.spinner.loading);
    const dispatch = useDispatch();
    const eliminar = () => {
        dispatch(spinnerCargando(true));

        const API_URL = process.env.REACT_APP_API_URL;
        const apiKey = localStorage.getItem('apiKey');
        const idUsuario = localStorage.getItem('idUsuario');

        fetch(`${API_URL}/registros.php?idRegistro=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey,
                'iduser': idUsuario
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.codigo === 200) {
                    dispatch(eliminarRegistro(id));
                }
                dispatch(spinnerCargando(false));

            })
            .catch(error => {
                console.error('Error:', error);
                dispatch(spinnerCargando(false));

            })
    }


    return (
        <div>
            {cargando ? <Spinner /> :
                <button type="button" className="btn btn-danger btn-sm" onClick={eliminar}>Eliminar</button>}
        </div>



    )
}

export default EliminarRegistro