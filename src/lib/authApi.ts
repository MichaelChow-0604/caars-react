export interface LoginResponse {
  accessToken: string
}

export async function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Login failed')
  const data = (await res.json()) as LoginResponse
  return data
}

export async function refreshAccessToken(): Promise<LoginResponse> {
  const res = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Refresh failed')
  const data = (await res.json()) as LoginResponse
  return data
}
