import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Grafico de sesiones por actividad',
        },
    },
};

const SesionesActividad = () => {

    const registros = useSelector(state => state.registro.registros);
    const actividades = useSelector(state => state.actividad.actividades);

    console.log(registros);
    

    const actividadesConRegistros = actividades.map(actividad => ({
        nombre: actividad.nombre,
        sesiones: registros.filter(registro => registro.idActividad === actividad.id).length,
    }))
        .filter(actividad => actividad.sesiones > 0);

    console.log(actividadesConRegistros);


    return (
        <Bar options={options} data={{
            labels: actividadesConRegistros.map(actividad => actividad.nombre),
            datasets: [
                {
                    label: 'Cantidad de sesiones',
                    data: actividadesConRegistros.map(actividad => actividad.sesiones),
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        }} />
    )
}

export default SesionesActividad