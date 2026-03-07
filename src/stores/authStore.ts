import { create } from 'zustand'

interface AuthState {
  accessToken: string | null
  isAuthenticated: boolean
  setAccessToken: (token: string | null) => void
  login: (accessToken: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isAuthenticated: false,
  setAccessToken: (token) =>
    set({ accessToken: token, isAuthenticated: !!token }),
  login: (accessToken) =>
    set({ accessToken, isAuthenticated: true }),
  logout: () =>
    set({ accessToken: null, isAuthenticated: false }),
}))
