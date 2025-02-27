import { configureStore } from '@reduxjs/toolkit';
import registroReducer from '../features/registroSlice';
import actividadReducer from '../features/actividadSlice';
import spinnerReducer from '../features/spinnerSlice';


export const store = configureStore({

    reducer: {
        registro: registroReducer,
        actividad: actividadReducer,
        spinner: spinnerReducer



    }
})


