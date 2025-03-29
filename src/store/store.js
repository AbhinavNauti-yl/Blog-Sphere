import {configureStore} from '@reduxjs/toolkit'

import countSlice from './slices/count.slice.js'

const store = configureStore(
    {
        reducer: {
            countSlice: countSlice
        }
    },
)

export default store