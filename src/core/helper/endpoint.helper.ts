import { AxiosError } from 'axios';
import { Observable, throwError } from 'rxjs';

export const getBaseUrl = (): string => {
  return process.env.CLOVER_API_URL;
};

export const handleError = (error: AxiosError): Observable<never> => {
  if (error.response) {
    const { data, status } = error.response;
    console.log(data, status);
    return throwError(
      `Request failed with status ${status}: ${JSON.stringify(data)}`,
    );
  } else {
    return throwError('Request failed');
  }
};
