import React, { useEffect, useState } from 'react'
import Filtro from './Filtro'
import ListadoGeneral from './ListadoRegistros/ListadoGeneral';
import { TiempoTotal } from './TiempoTotal';
import TiempoDiario from './TiempoDiario';
import AgregarRegistro from './Registro/AgregarRegistro';
import SesionesActividad from './Graficos/SesionesActividad';
import MinutosDias from './Graficos/MinutosDias';
import FraseMotivadora from './FraseMotivadora';
import { useNavigate } from 'react-router';



const Dashboard = () => {

    useEffect(() => {
        if (localStorage.getItem('apiKey') === null || localStorage.getItem('idUsuario') === null) {
            navigate('/');
        }
    }, [])


    const [filtro, setFiltro] = useState('Todas');
    let navigate = useNavigate();


    const Logout = () => {
        localStorage.clear();
        navigate('/');
    }


    return (



        <div className="bg-light">

            <nav className="navbar navbar-light bg-white shadow-sm px-3">
                <span className="navbar-brand mb-0 h1">Dashboard</span>
                <button onClick={Logout} className="btn btn-outline-danger">
                    Cerrar Sesión
                </button>
            </nav>


            <main className="container py-5">
                <div className="text-center w-50 mx-auto mb-4 ">
                    <FraseMotivadora />
                </div>

                <h1 className="text-center mb-5">Mis Actividades</h1>
                <div className="row g-4">
                    <div className="col-lg-4">
                        {<AgregarRegistro />}
                    </div>


                    <div className="col-lg-8">

                        <div className="d-flex justify-content-start align-items-center mb-4">
                            <h5 className="mb-0 px-1">Filtrar por:</h5>
                            <Filtro filtro={setFiltro} />
                        </div>


                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <h5 className="card-title mb-3">Registros</h5>
                                <ListadoGeneral filtro={filtro} />
                            </div>
                        </div>

                        <div className="row g-4 mb-4">
                            <div className="col-md-6">
                                <div className="card h-30 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">Tiempos</h5>
                                        <TiempoTotal />
                                        <TiempoDiario />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">Gráficos</h5>
                                        <div className="chart-placeholder bg-light rounded-3 p-4">
                                            <SesionesActividad />
                                            <br />
                                            <MinutosDias />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard