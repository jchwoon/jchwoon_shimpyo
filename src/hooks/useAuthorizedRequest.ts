import axios, { AxiosError, AxiosResponse, Method } from 'axios';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { accessTokenAtom } from '../recoil/atoms';

const API_URL = process.env.REACT_APP_API_URL;

interface useAuthorizedHookProps {
  onUnauthorized?: (error: AxiosError) => void;
}

interface IResponseData<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  result: T;
}

interface useAuthorizedRequestProps {
  url: string;
  method?: Method;
  withCredentials?: boolean;
  body?: any;
}

export default function useAuthorizedRequest<T>({ onUnauthorized }: useAuthorizedHookProps) {
  const accessToken = useRecoilValue(accessTokenAtom);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [responseData, setResponseData] = useState<IResponseData<T> | null>(null);

  const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
  });

  const sendRequest = async ({ url, method = 'GET', body, withCredentials }: useAuthorizedRequestProps) => {
    setIsLoading(true);
    setErrorMessage('');
    setResponseData(null);

    try {
      const response: AxiosResponse = await axiosInstance({ url, method, data: body, withCredentials });
      setResponseData(response.data);
    } catch (error: any) {
      if (error.response) {
        console.log(error);
        if (error.response?.status === 401 && onUnauthorized) {
          onUnauthorized(error);
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage(error.message);
        console.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, errorMessage, responseData, sendRequest };
}