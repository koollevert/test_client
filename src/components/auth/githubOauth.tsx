import React, { useState } from 'react';

const GitHubOAuth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = () => {
    setLoading(true);
    const redirectUri = window.location.origin + '/'; // Change this to the actual route on your frontend
    const githubAuthUrl = `https://tikitika.dev/api/auth/github?redirect_uri=${encodeURIComponent(redirectUri)}`;
    
    // Redirect to GitHub OAuth
    window.location.href = githubAuthUrl;
  };

  return (
    <div>
      <h2>Login with GitHub</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Redirecting to GitHub...' : 'Login with GitHub'}
      </button>
    </div>
  );
};

export default GitHubOAuth;
