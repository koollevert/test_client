import axios from 'axios';

const buildAxiosClient = ({ req }: { req?: any }) => {
  if (typeof window === 'undefined') {
    // Running on the server
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
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



// import axios from 'axios';

// const buildAxiosClient = ({ req }: { req?: any }) => {
//   if (typeof window === 'undefined') {
//     // Running on the server
//     const headers = req ? { ...req.headers } : undefined;
//     // Filter out any non-serializable values from headers
//     const filteredHeaders = headers
//       ? Object.fromEntries(
//           Object.entries(headers).filter(([key, value]) => typeof value === 'string')
//         )
//       : undefined;

//     return axios.create({
//       baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
//       headers: filteredHeaders,
//     });
//   } else {
//     // Running on the client
//     return axios.create({
//       baseURL: '/',
//     });
//   }
// };

// export default buildAxiosClient;
