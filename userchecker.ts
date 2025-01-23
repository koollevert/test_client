import { fetchSession } from "./lib/authService";

const displayCurrentUser = async () => {
  const currentUser = await fetchSession();
  if (currentUser) {
    console.log('Logged in as:', currentUser);
  } else {
    console.log('No user logged in.');
  }
};

displayCurrentUser()