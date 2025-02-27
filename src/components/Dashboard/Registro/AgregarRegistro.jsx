import React, { useRef, useState } from 'react'
import InputCampo from '../../UI/InputCampo'
import { useSelector } from 'react-redux';
import ObtenerActividades from './ObtenerActividades'
import { useDispatch } from 'react-redux';
import AlertaExito from '../../Alertas/AlertaExito';
import AlertaError from '../../Alertas/AlertaError';
import { guardarRegistro } from '../../../features/registroSlice';




const AgregarRegistro = () => {

    const [actividadId, setActividadId] = useState(null);
    const [exitoAgregar, setExitoAgregar] = useState(null);
    const [mensaje, setMensaje] = useState(null);
    const tiempo = useRef();
    const fecha = useRef();
    const dispatch = useDispatch();
    const fechaHoy = new Date();
    const actividades = useSelector(state => state.actividad.actividades);
    const registros = useSelector(state => state.registro.registros);


    const guardar = () => {


        const apiKey = localStorage.getItem('apiKey');
        const idUsuario = localStorage.getItem('idUsuario');
        const API_URL = process.env.REACT_APP_API_URL;


        if (actividadId === null || tiempo.current.value === "" || fecha.current.value === "") {
            setExitoAgregar(false);
            setMensaje("Debe completar todos los campos");
            return;
        }

        if (new Date(fecha.current.value) > fechaHoy) {
            setExitoAgregar(false);
            setMensaje("La fecha ingresada no puede ser mayor a la fecha actual");
            return;
        }

        if (tiempo.current.value < 1) {
            setExitoAgregar(false);
            setMensaje("El tiempo ingresado debe ser igual o mayor a 1");
            return;
        }

        const registro = {
            idUsuario: idUsuario,
            idActividad: actividadId,
            tiempo: tiempo.current.value,
            fecha: new Date(fecha.current.value)
        }



        fetch(`${API_URL}/registros.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': apiKey,
                'iduser': idUsuario
            },
            body: JSON.stringify(registro)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.codigo == 200) {
                    const nuevoRegistro = {
                        id: data.idRegistro,
                        idUsuario: idUsuario,
                        idActividad: Number(actividadId),
                        tiempo: Number(tiempo.current.value),
                        fecha: new Date(fecha.current.value).toISOString().split('T')[0],
                        imagen: null,
                        actividad: null
                    };
                    console.log(nuevoRegistro);

                    console.log(actividades);

                    const actividad = actividades.find(actividad => actividad.id == actividadId);
                    console.log(actividad);
                    nuevoRegistro.actividad = actividad.nombre;
                    nuevoRegistro.imagen = `${API_URL}/imgs/${actividad.imagen}.png`;

                    dispatch(guardarRegistro([...registros, nuevoRegistro]));

                    setExitoAgregar(true);
                    setMensaje("Registro guardado con éxito");
                }


            })
            .catch(error => {
                setExitoAgregar(false);
                console.error('Error:', error);
                setMensaje("Error al guardar el registro");
            });
    }

    return (



        <div className="card h-80 shadow-sm">
            <div className="card-body">
                <h5 className="card-title mb-4">Nuevo Registro</h5>
                <div className="mb-3">
                    <label className="form-label">Actividad</label>
                    <ObtenerActividades setIdSeleccionado={setActividadId} />
                </div>

                <div className="mb-3">
                    <InputCampo label="Tiempo (min)" type="number" placeholder="Ingrese el tiempo en minutos" ref={tiempo} />
                </div>



                <div className="mb-4">
                    <InputCampo label="Fecha" type="date" ref={fecha} />
                </div>

                <button type="button" className="btn btn-primary w-100" onClick={guardar}>Guardar</button>

                {exitoAgregar != null && (exitoAgregar ? <AlertaExito mensaje={mensaje} /> : <AlertaError mensaje={mensaje} />)}

            </div>
        </div>

    )
}

export default AgregarRegistro