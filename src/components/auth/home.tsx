import { useEffect, useState } from 'react';
import { fetchCurrentUser } from '../../../lib/authService';


const HomePage = () => {
  interface User {
    email: string;
  }

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const user = await fetchCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    getCurrentUser();
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {currentUser ? (
        <p>Logged in as: {currentUser.email}</p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default HomePage;