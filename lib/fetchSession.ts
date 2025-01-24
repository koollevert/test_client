export async function fetchCurrentUser(req?: any) {
  const baseUrl = typeof window === 'undefined' 
    ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
    : '/';

  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Host': 'tikitika.dev',
      'Connection': 'keep-alive',
      'X-Forwarded-Host': 'tikitika.dev',
      'X-Forwarded-Proto': 'https',
      ...(req?.headers ? Object.fromEntries(
        Object.entries(req.headers)
          .filter(([key, value]) => 
            typeof value === 'string' && 
            !['host', 'connection'].includes(key.toLowerCase())
          )
      ) : {})
    },
    signal: AbortSignal.timeout(5000) // 5 second timeout
  };

  // Implement retry logic
  const MAX_RETRIES = 3;
  let lastError;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      console.log(`Attempt ${attempt + 1} - Fetching current user`);
      const response = await fetch(`${baseUrl}/api/auth/session`, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Current User Data:', data);
      return data.currentUser || null;

    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt + 1} failed:`, error);
      if (attempt < MAX_RETRIES - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }

  console.error('All retry attempts failed:', lastError);
  return null;
}