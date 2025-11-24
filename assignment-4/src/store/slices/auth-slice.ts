import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "@/types";

const STORAGE_KEY = "ecom_auth_user";

type AuthState = {
  user: AuthUser | null
}

const initialState: AuthState = {
  user: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload))
      }
    },
    logout(state) {
      state.user = null
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY)
      }
    },
    updateProfile(state, action: PayloadAction<Partial<AuthUser>>) {
      if (!state.user) return
      state.user = { ...state.user, ...action.payload }
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user))
      }
    },
    hydrateFromStorage(state) {
      if (typeof window === "undefined") return
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        try {
          state.user = JSON.parse(raw)
        } catch {
          localStorage.removeItem(STORAGE_KEY)
        }
      }
    },
  },
})

export const { loginSuccess, logout, updateProfile, hydrateFromStorage } = authSlice.actions;
export default authSlice.reducer;
