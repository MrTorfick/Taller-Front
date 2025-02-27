import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router';
import InputCampo from './UI/InputCampo'
import AlertaError from './Alertas/AlertaError';
import { useDispatch, useSelector } from 'react-redux';
import { spinnerCargando } from '../features/spinnerSlice';
import Spinner from './UI/Spinner';

const Registro = () => {

    const [paises, setPaises] = useState([]);
    const usuario = useRef("");
    const password = useRef("");
    const paisId = useRef("");
    let navigate = useNavigate();
    const [mensaje, setMensaje] = useState(null);
    const [exitoAgregar, setExitoAgregar] = useState(null);
    const dispatch = useDispatch();
    const cargando = useSelector(state => state.spinner.loading);
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/paises.php`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Paises", data);
                setPaises(data.paises);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const registro = () => {
        dispatch(spinnerCargando(true));

        if (usuario.current.value === "" || password.current.value === "" || paisId.current.value === "") {
            setExitoAgregar(false);
            setMensaje("Debe completar todos los campos");
            return;
        }

        fetch(`${API_URL}/usuarios.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuario: usuario.current.value,
                password: password.current.value,
                idPais: paisId.current.value
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.codigo === 200) {
                    localStorage.setItem('apiKey', data.apiKey);
                    localStorage.setItem('idUsuario', data.id);
                    setExitoAgregar(true);
                    dispatch(spinnerCargando(false));
                    navigate('/dashboard');
                } else {
                    dispatch(spinnerCargando(false));
                    setExitoAgregar(false);
                    throw new Error("Error al registrar usuario. Verifique los datos ingresados");
                }

            })
            .catch(error => {
                dispatch(spinnerCargando(false));
                setExitoAgregar(false);
                setMensaje(error.message);
                console.error('Error:', error);
            });
    }

    return (
        <div className="d-flex align-items-center min-vh-100 w-100">
            <main className="container-sm">
                <section className="card shadow-lg mt-5 mx-auto p-md-5" style={{ maxWidth: "400px", width: "100%" }}>
                    <div className="card-body">
                        <h2 className="text-center mb-4">Registrarse</h2>

                        <InputCampo label="Usuario" type="text" placeholder="Ingresa tu nombre de usuario" ref={usuario} />
                        <InputCampo label="Contraseña" type="password" placeholder="Ingresa tu contraseña" ref={password} />
                        <div className="mb-4">
                            <label className="form-label">Seleccione un pais de residencia</label>
                            <select className="form-select" ref={paisId}>
                                <option value="">Selecciona tu país</option>
                                {paises.map((pais) => (
                                    <option key={pais.id} value={pais.id}>
                                        {pais.name}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <button type="button" className="btn btn-success w-100 mb-3" onClick={registro}>Crear Cuenta</button>
                        <Link to="/">
                            <p className="text-center text-muted">
                                ¿Ya tienes cuenta? <span>Inicia sesión</span>
                            </p>
                        </Link>
                        {cargando ? <Spinner /> : null}
                        {exitoAgregar != null && (exitoAgregar ? null : <AlertaError mensaje={mensaje} />)}

                    </div>
                </section>
            </main>
        </div>
    )
}

export default Registro