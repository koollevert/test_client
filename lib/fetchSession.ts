export async function fetchSession(req?: any) {
  const res = await fetch('https://tikitika.dev/api/auth/session', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Cookie': req?.headers.get('cookie') || '',
    },
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.session || null;
}
