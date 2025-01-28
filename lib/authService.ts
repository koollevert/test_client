import buildAxiosClient from "./api";

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  jwt: string; // Include JWT in the response
}


export async function signInWithApi(credentials: SignInCredentials, req?: any): Promise<AuthUser> {
  const { email, password } = credentials;

  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  const axiosClient = buildAxiosClient({ req });

  try {
    const response = await axiosClient.post<AuthUser>('/api/auth/signin', {
      email,
      password,
    });

    return response.data; // User details including JWT
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Authentication failed.';
    throw new Error(errorMessage);
  }
}

export async function signUpWithApi(credentials: { email: string; password: string; name: string }, req?: any): Promise<AuthUser> {
  const { email, password, name } = credentials;

  if (!email || !password || !name) {
    throw new Error('Email, password, and name are required.');
  }

  const axiosClient = buildAxiosClient({ req });

  try {
    const response = await axiosClient.post<AuthUser>('/api/auth/signup', {
      email,
      password,
      name,
    });

    return response.data; // User details including JWT
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Signup failed.';
    throw new Error(errorMessage);
  }
}

export async function handleOAuthCallback({code, provider, redirect_uri, req}:any) {
  if (!code || !provider || !redirect_uri) {
    throw new Error('Code redirect_uri and provider are required.');
  }

  const axiosClient = buildAxiosClient({ req });

  try {
    const response = await axiosClient.post('/api/auth/oauth/callback', {
      code,
      provider,
      redirect_uri,
    });

    return response.data; // User details including JWT
  } catch (error:any) {
    const errorMessage = error.response?.data?.message || 'OAuth callback failed.';
    throw new Error(errorMessage);
  }
}

export async function signOutWithApi(req?: any): Promise<void> {
  const axiosClient = buildAxiosClient({ req });

  try {
    await axiosClient.post('/api/auth/signout');
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Signout failed.';
    throw new Error(errorMessage);
  }
}

export const fetchCurrentUser = async () => {
  const response = await fetch('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/auth/session', {
    method: 'GET',
    credentials: 'include', // Include cookies in the request
  });

  if (!response.ok) {
    throw new Error('Failed to fetch current user');
  }

  const data = await response.json();
  return data.currentUser || null; // Return the user if present, otherwise null
};