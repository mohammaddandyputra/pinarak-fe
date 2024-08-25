import errorToastify from './errorToastify';
import getTokenConfig from './getTokenConfig';
import successToastify from './successToastify';

const fetchApi = async (
  method: string,
  url: string,
  body?: any,
  withoutSwal?: boolean,
  messageSuccess?: string
): Promise<any> => {
  try {
    const { headers } = getTokenConfig();
    const options: RequestInit = {
      method,
      body: JSON.stringify(body),
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData?.message || 'Unknown error';
      return errorToastify(errorMessage);
    }

    const responseData = await response.json();
    if (!withoutSwal) {
      successToastify(messageSuccess || responseData?.message);
    }
    return responseData;
  } catch (e: any) {
    throw new Error(e?.message || 'An error occurred');
  }
};

export default fetchApi;
