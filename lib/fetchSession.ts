'use server';

export async function fetchCurrentUser(req?: any) {
  const baseUrl = typeof window === 'undefined' 
    ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
    : '/';

  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Host': 'tikitika.dev', // Add host header for ingress routing
      ...(req?.headers ? Object.fromEntries(
        Object.entries(req.headers).filter(([_, v]) => typeof v === 'string')
      ) : {})
    }
  };

  try {
    console.log('Fetching current user with options:', options);
    const response = await fetch(`${baseUrl}/api/auth/session`, options);

    if (!response.ok) {
      console.error('Failed to fetch current user:', response.statusText);
      return null;
    }

    const data = await response.json();
    console.log('Current User Data:', data);
    return data.currentUser || null;

  } catch (error) {
    console.error('Error fetching current user:', error);
    return null;
  }
}