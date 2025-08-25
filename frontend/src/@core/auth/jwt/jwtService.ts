import api from '../../../common/http';
import jwtDefaultConfig, { JwtConfig } from './jwtDefaultConfig';
import { simulateLogin } from './mockAuthService';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

type Subscriber = (accessToken: string) => void;

export default class JwtService {
  jwtConfig: JwtConfig = { ...jwtDefaultConfig };
  isAlreadyFetchingAccessToken = false;
  subscribers: Subscriber[] = [];

  constructor(jwtOverrideConfig: Partial<JwtConfig>) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };

    api.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const accessToken = this.getToken();
        if (accessToken && config.headers) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const { config, response } = error;
        const originalRequest = config;

        if (response && response.status === 401) {
          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true;
            this.refreshToken().then(r => {
              this.isAlreadyFetchingAccessToken = false;
              this.setToken(r.data.accessToken);
              this.setRefreshToken(r.data.refreshToken);
              this.onAccessTokenFetched(r.data.accessToken);
            });
          }
          const retryOriginalRequest = new Promise(resolve => {
            this.addSubscriber((accessToken: string) => {
              if (originalRequest?.headers) {
                originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
              }
              resolve(api(originalRequest!));
            });
          });
          return retryOriginalRequest;
        }
        return Promise.reject(error);
      }
    );
  }

  onAccessTokenFetched(accessToken: string): void {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken));
  }

  addSubscriber(callback: Subscriber): void {
    this.subscribers.push(callback);
  }

  getToken(): string | null {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
  }

  setToken(value: string): void {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  setRefreshToken(value: string): void {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }

  login(...args: any[]): Promise<any> {
    const [loginDetails] = args;
    return simulateLogin(loginDetails)
      .then(response => {
        return response;
      })
      .catch(error => {
        throw error;
      });
  }

  register(...args: any[]): Promise<any> {
    return api.post(this.jwtConfig.registerEndpoint, ...args);
  }

  refreshToken(): Promise<any> {
    return api.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken()
    });
  }
}
