import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value:localStorage.getItem("user") ? JSON.parse (localStorage.getItem("user")) :null,
};
export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
  userInfo: (state,action) => {
      state.value = action.payload;
    },
removeUser: (state) => {
  state.value = null;
  localStorage.removeItem("user"); 
}
  },
})

export const {userInfo,removeUser } = userSlice.actions;
export default userSlice.reducer