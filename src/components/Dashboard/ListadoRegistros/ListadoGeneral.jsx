import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListadoItems from './ListadoItems';
import { guardarActividades } from '../../../features/actividadSlice';
import { spinnerCargando } from '../../../features/spinnerSlice';
import AlertaError from '../../Alertas/AlertaError';
import { guardarRegistro } from '../../../features/registroSlice';

const Listado = ({ filtro }) => {

  const dispatch = useDispatch();
  const registros = useSelector(state => state.registro.registros);
  const actividades = useSelector(state => state.actividad.actividades);
  const [exitoAgregar, setExitoAgregar] = useState(true)
  const [mensajeError, setMensajeError] = useState(null);
  const apiKey = localStorage.getItem('apiKey');
  const idUsuario = localStorage.getItem('idUsuario');
  const API_URL = process.env.REACT_APP_API_URL;


  useEffect(() => {
    dispatch(spinnerCargando(true));
    fetch(`${API_URL}/actividades.php`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apikey: apiKey,
        iduser: idUsuario,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al cargar las actividades');
        }
        return response.json();
      })
      .then((ActividadesData) => {
        console.log(ActividadesData);

        dispatch(guardarActividades(ActividadesData.actividades));
        dispatch(spinnerCargando(false));

      }).catch((error) => {
        console.error('Error:', error);
        setExitoAgregar(false);
        setMensajeError(error.message);
        dispatch(spinnerCargando(false));

      })

  }, []);



  useEffect(() => {
    if (!actividades.length) return;//Se evita que se haga la llamada si no hay actividades

    dispatch(spinnerCargando(true));

    fetch(`${API_URL}/registros.php?idUsuario=${idUsuario}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        apikey: apiKey,
        iduser: idUsuario,
      },
    })
      .then((response) => {
        console.log(response);

        if (!response.ok) {
          throw new Error('Error al cargar los registros');
        }
        return response.json();
      })
      .then((RegistrosData) => {

        if (RegistrosData.codigo === 200) {

          const registrosConNombre = RegistrosData.registros.map(registro => {


            const actividad = actividades.find(
              act => act.id === registro.idActividad
            );
            return {
              ...registro,
              actividad: actividad.nombre,
              imagen: `${API_URL}/imgs/${actividad.imagen}.png`
            };
          });
          dispatch(guardarRegistro(registrosConNombre));
          setExitoAgregar(true);
          console.log(registrosConNombre);
        }
        dispatch(spinnerCargando(false));
      }).catch((error) => {
        console.error('Error al cargar los registros:', error);
        setExitoAgregar(false);
        dispatch(spinnerCargando(false));
        setMensajeError(error.message);
      });

  }, [actividades]);


  console.log(registros);

  return (

    <div>
      {exitoAgregar ? <ListadoItems registros={registros} filtro={filtro} /> : (
        <AlertaError mensaje={mensajeError} />
      )}

    </div>
  );
};

export default Listado;
