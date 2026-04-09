// src/Store.js
import { configureStore } from '@reduxjs/toolkit'

// Import slices (ensure filenames match exactly!)
import userSlice from './Slice/userSlice'      // file: src/Slice/userSlice.js
import Messageslice from './Slice/Messageslice' // file: src/Slice/messageSlice.js

export const store = configureStore({
  reducer: {
    userInfo: userSlice,
    selectedUser: Messageslice,
  },
})
