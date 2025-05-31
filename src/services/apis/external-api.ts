import UnAuthenticatedRequest from '@/services/requests/unauthenticated';

export class ExternalApi extends UnAuthenticatedRequest {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static getExternalData(): Promise<any> {
    // can call an external API here
    // this.get(URL)
    return new Promise(resolve => {
      // Simulate an API call
      setTimeout(() => {
        const data = { message: 'Hello from the external API!' };

        resolve(data);
      }, 1000);
    });
  }
}
