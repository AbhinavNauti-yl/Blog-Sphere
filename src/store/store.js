import {configureStore} from '@reduxjs/toolkit'

import userSlice from './slices/user.slice.js'

const store = configureStore(
    {
        reducer: {
            userSlice: userSlice
        }
    },
)

export default store