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
            text: 'Grafico de minutos de los ultimos siete dias',
        },
    },
};

const MinutosDias = () => {

    const registros = useSelector(state => state.registro.registros);


    const fechaActual = new Date();
    const ultimos7Dias = [];

    for (let i = 6; i >= 0; i--) {
        let fecha = new Date(fechaActual);
        fecha.setDate(fechaActual.getDate() - i);
        ultimos7Dias.push(fecha.toISOString().split('T')[0]);
    }

    const minutosPorDia = ultimos7Dias.map(dia => {
        const registrosDelDia = registros.filter(registro =>
            new Date(registro.fecha).toISOString().split('T')[0] === dia
        );

        let sumaMinutos = 0;
        registrosDelDia.map(registro => sumaMinutos += registro.tiempo);

        return sumaMinutos;
    });





    return (

        <Bar options={options} data={{
            labels: ultimos7Dias,
            datasets: [
                {
                    label: 'Cantidad de minutos',
                    data: minutosPorDia,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        }}
        />

    )
}

export default MinutosDias