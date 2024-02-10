import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { studentApi } from './studentSlice'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [studentApi.reducerPath]: studentApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware),
})


setupListeners(store.dispatch)