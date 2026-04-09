import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:"",
};
export const messageSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
  selecteduser: (state,action) => {
      state.value = action.payload;
    },

  },
})

export const {selecteduser,removeUser } = messageSlice.actions;
export default messageSlice.reducer