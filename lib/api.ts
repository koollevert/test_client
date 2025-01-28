import axios from 'axios';

const buildAxiosClient = ({ req }: { req?: any }) => {
  if (typeof window === 'undefined') {
    // Running on the server
    return axios.create({
      baseURL: 'http://auth-srv:3000',
      headers: req ? req.headers  : undefined,
    });
  } else {
    // Running on the client
    return axios.create({
      baseURL: '/',
    });
  }
};

export default buildAxiosClient;

