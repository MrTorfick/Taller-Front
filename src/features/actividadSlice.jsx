import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    actividades: []
}

export const actividadSlice = createSlice({
    name: "actividad",
    initialState,
    reducers: {
        guardarActividades: (state, action) => {
            state.actividades = action.payload;
        }
    }
})

export const { guardarActividades } = actividadSlice.actions;
export default actividadSlice.reducer;
