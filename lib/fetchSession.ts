export async function fetchSession(req?: any) {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Cookie': req?.headers.get('cookie') || '',
      'Host': req?.headers.get('host') || 'tikitika.dev',
      'X-Forwarded-Host': req?.headers.get('x-forwarded-host') || 'tikitika.dev',
      'X-Forwarded-Proto': req?.headers.get('x-forwarded-proto') || 'https'
    }
  };

  try {
    const response = await fetch('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/auth/session', options);
    
    if (!response.ok) {
      console.error('Session fetch failed:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    return data.session || null;
  } catch (error) {
    console.error('Session fetch error:', error);
    return null;
  }
}