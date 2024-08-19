import getTokenConfig from './getTokenConfig';

const getFetcherData = async (url: string): Promise<any> => {
  const { headers, credentials } = getTokenConfig();

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      ...headers,
      'Strict-Transport-Security': 'max-age=86400; preload',
    },
    credentials,
  }).then((res) => {
    console.log('res => ', res);
    if (!res.ok) {
      throw new Error(res?.statusText || 'Network response was not ok');
    }
    return res.json();
  });

  return response;
};

export default getFetcherData;
