import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:"",
};
export const MessageSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
  selecteduser: (state,action) => {
      state.value = action.payload;
    },

  },
})

export const {selecteduser,removeUser } = MessageSlice.actions;
export default MessageSlice.reducer