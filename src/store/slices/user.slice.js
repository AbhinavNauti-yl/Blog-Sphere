import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    userInfo: JSON.parse(localStorage?.getItem("account")) || null
}

const userSlice = createSlice(
    {
        name: "userSlice",
        initialState,
        reducers: {
            setUserInfo(state, action) {
                state.userInfo = (action.payload.data);
            },
            resetUserInfo(state, action) {
                state.userInfo = null;
            }
        }
    }
)

export const {setUserInfo, resetUserInfo} = userSlice.actions

export default userSlice.reducer