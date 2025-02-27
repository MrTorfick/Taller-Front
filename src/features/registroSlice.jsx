import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    registros: []
}


export const registroSlice = createSlice({

    name: "registro",
    initialState,
    reducers: {

        guardarRegistro: (state, action) => {
            state.registros = action.payload;
        },
        eliminarRegistro: (state, action) => {
            state.registros = state.registros.filter(registro => registro.id !== action.payload); //Nuevo array sin el registro eliminado
        }
    }

})

export const { guardarRegistro, eliminarRegistro } = registroSlice.actions;
export default registroSlice.reducer;