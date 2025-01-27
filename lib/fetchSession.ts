export async function fetchSession(req?: any) {
  const res = await fetch('http://auth-srv:3000/api/auth/session', {
    method: 'GET',
    credentials: 'include',
    headers: req?.headers,
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.session || null;
}
