import getTokenConfig from './getTokenConfig';

const getFetcherData = async (url: string): Promise<any> => {
  const { headers } = getTokenConfig();

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      ...headers,
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(res?.statusText || 'Network response was not ok');
    }
    return res.json();
  });

  return response;
};

export default getFetcherData;
