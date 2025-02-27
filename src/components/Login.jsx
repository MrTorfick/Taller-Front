import React, { useRef, useState } from 'react'
import InputCampo from './UI/InputCampo';
import { Link, useNavigate } from 'react-router';
import AlertaError from './Alertas/AlertaError';
import { useDispatch, useSelector } from 'react-redux';
import { spinnerCargando } from '../features/spinnerSlice';
import Spinner from './UI/Spinner';

const Login = () => {

    const usuario = useRef("");
    const password = useRef("");
    let navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    const [botonLogin, setBotonLogin] = useState(false)
    const [mensaje, setMensaje] = useState(null);
    const [exitoAgregar, setExitoAgregar] = useState(null);
    const dispatch = useDispatch();
    const cargando = useSelector(state => state.spinner.loading);




    const cambioInput = e => {
        usuario.current.value && password.current.value ? setBotonLogin(true) : setBotonLogin(false)
    }



    const loginPost = () => {
        dispatch(spinnerCargando(true));

        fetch(`${API_URL}/login.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuario: usuario.current.value,
                password: password.current.value
            })

        }).then(response => response.json())
            .then(data => {
                if (data.codigo === 200) {
                    console.log(data);
                    localStorage.setItem('apiKey', data.apiKey);
                    localStorage.setItem('idUsuario', data.id);
                    setExitoAgregar(true);
                    dispatch(spinnerCargando(false));
                    navigate('/dashboard');
                } else {
                    setExitoAgregar(false);
                    dispatch(spinnerCargando(false));
                    throw new Error("Error al iniciar sesión. Verifique los datos ingresados");

                }
            })
            .catch(error => {
                dispatch(spinnerCargando(false));
                setMensaje(error.message);
                console.error('Error:', error);
            });

    }



    return (

        <div className="d-flex align-items-center min-vh-100 w-100">
            <main className="container-sm">
                <section className="card shadow-lg mt-5 mx-auto p-md-5" style={{ maxWidth: "400px", width: "100%" }}>
                    <div className="card-body">
                        <h2 className="text-center mb-4">Iniciar Sesión</h2>
                        <InputCampo label="Usuario" type="text" placeholder="Ingresa tu nombre de usuario" ref={usuario} onChange={cambioInput} />
                        <InputCampo label="Contraseña" type="password" placeholder="Ingresa tu contraseña" ref={password} onChange={cambioInput} />
                        <button type="button" className="btn btn-success w-100 mb-3" onClick={loginPost} disabled={!botonLogin}>Ingresar</button>

                        <Link to="/registro">
                            <p className="text-center text-muted">
                                ¿No tienes cuenta? <span>Regístrate</span>
                            </p>
                        </Link>

                        {cargando ? <Spinner /> : null}
                        {exitoAgregar != null && (exitoAgregar ? null : <AlertaError mensaje={mensaje} />)}

                    </div>
                </section>
            </main>




        </div>
    );
};

export default Login