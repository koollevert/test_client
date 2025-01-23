'use server';

export async function getCurrentUser(req?: any) {
  const url = 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/auth/session';
  const options: RequestInit = {
    method: 'GET',
    credentials: 'same-origin',
  };

  if (req) {
    options.headers = req.headers;
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error('Failed to fetch current user');
  }

  const data = await response.json();
  console.log('Current User:', data.currentUser); // Log the current user
  return data.currentUser || null; // Return the user if present, otherwise null
}