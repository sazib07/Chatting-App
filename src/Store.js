import { configureStore } from '@reduxjs/toolkit'
import userSlice from './Slice/userslice'
import  Messageslice from './Slice/Messageslice'

export const store = configureStore({
  reducer: {
    userInfo:userSlice,
    selecteduser:Messageslice,
  },
})