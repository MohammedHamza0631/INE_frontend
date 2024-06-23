import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    loggedIn: !!localStorage.getItem("token"),
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.loggedIn = true;

      localStorage.setItem("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.loggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, setUser, logout } = userSlice.actions;
export default userSlice.reducer;
