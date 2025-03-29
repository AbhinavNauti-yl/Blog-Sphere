import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 1
}

const coutSlice = createSlice(
    {
        name: "countSlice",
        initialState,
        reducers: {
            increment: (state) => {
                state.value = state.value + 1
            },
            decerement: (state) => {
                state.value = state.value - 1
            }
        }
    }
)

export const {increment, decerement} = coutSlice.actions

export default coutSlice.reducer