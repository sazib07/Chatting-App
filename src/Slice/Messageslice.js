import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:"",
};
export const Messageslice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
  selecteduser: (state,action) => {
      state.value = action.payload;
    },

  },
})

export const {selecteduser,removeUser } = Messageslice.actions;
export default Messageslice.reducer