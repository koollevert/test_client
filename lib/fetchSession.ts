export async function fetchSession(req?: any) {
  const res = await fetch('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/auth/session', {
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
