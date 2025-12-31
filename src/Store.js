// src/Store.js
import { configureStore } from '@reduxjs/toolkit'

// Import slices (ensure filenames match exactly!)
import userSlice from './Slice/userslice'      // file: src/Slice/userSlice.js
import messageSlice from './Slice/messageSlice' // file: src/Slice/messageSlice.js

export const store = configureStore({
  reducer: {
    userInfo: userSlice,
    selectedUser: messageSlice,
  },
})
