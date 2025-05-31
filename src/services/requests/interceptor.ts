import type { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

import { IS_SERVER } from '@/constants/window';

import { removeAuthTokenCookie } from '@/lib/cookies';

const handleAccessError = (): void => {
  if (!IS_SERVER) {
    toast.error('Unauthorized or Forbidden access');
  }

  removeAuthTokenCookie();
};

const errorHandlerInterceptor = (err: AxiosError): Promise<AxiosError> => {
  if (err.message === 'Network Error') {
    if (!IS_SERVER) toast.error('Network Error Occurred');
  } else if (err.response && [401, 403].includes(err.response.status)) {
    handleAccessError();
  }

  return Promise.reject(err);
};

export default errorHandlerInterceptor;
