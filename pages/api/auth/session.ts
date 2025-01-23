import buildAxiosClient from "../../../lib/api";

// Define appContext
const appContext = {
  ctx: {}, // Add appropriate context properties here
  Component: {
    getInitialProps: async (ctx: any, client: any, currentUser: any) => {
      // Add appropriate logic here
      return {};
    }
  }
};

const fetchData = async () => {
  const client = buildAxiosClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);
  }

  return {
    pageProps,
    ...data,
  };
};

fetchData().then(result => {
  console.log(result);
}).catch(error => {
  console.error(error);
});