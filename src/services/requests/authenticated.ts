import type { IRequestHeaders } from '@/services/requests/base';
import BaseRequest, { DEFAULT_HEADERS } from '@/services/requests/base';

import { getAuthTokenCookie } from '@/lib/cookies';

class AuthenticatedRequest extends BaseRequest {
  static authenticatedHeaders(requestHeaders?: IRequestHeaders): IRequestHeaders {
    const authHeader: IRequestHeaders = {
      'x-auth-token': getAuthTokenCookie(),
    };
    const headers: IRequestHeaders = {
      ...(requestHeaders || DEFAULT_HEADERS),
      ...authHeader,
    };

    return headers;
  }

  static headers(requestHeaders?: IRequestHeaders): {
    headers?: IRequestHeaders;
  } {
    const defaultHeaders: { headers?: IRequestHeaders } = {
      headers: this.authenticatedHeaders(requestHeaders),
    };

    return { ...defaultHeaders };
  }
}

export default AuthenticatedRequest;
