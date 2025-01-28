export async function fetchSession(req?: any) {
  const res = await fetch('http://auth-srv:3000/api/auth/session', {
    method: 'GET',
    headers: req ? req.headers  : undefined,
  });

  

  const {currentUser} = await res.json();
  return currentUser || null;
}
