import Constants from 'expo-constants';

import { AppError } from './errors';

const timeoutMs = 10_000;

type RequestOptions = RequestInit & {
  timeoutMs?: number;
};

function getBaseUrl() {
  return process.env.EXPO_PUBLIC_API_BASE_URL ?? Constants.expoConfig?.extra?.apiBaseUrl ?? '';
}

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? timeoutMs);

  try {
    const response = await fetch(`${getBaseUrl()}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw {
        code: 'http_error',
        message:
          response.status === 401
            ? 'Usuario ou senha invalidos.'
            : 'Erro ao comunicar com o servidor.',
        status: response.status,
        retryable: response.status >= 500,
      } satisfies AppError;
    }

    const contentType = response.headers.get('content-type') ?? '';

    if (response.status === 204 || !contentType.includes('application/json')) {
      return undefined as T;
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

export const httpClient = {
  get: <T>(path: string, options?: RequestOptions) => request<T>(path, options),
  post: <T>(path: string, body: unknown, options?: RequestOptions) =>
    request<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    }),
  put: <T>(path: string, body: unknown, options?: RequestOptions) =>
    request<T>(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, {
      ...options,
      method: 'DELETE',
    }),
};
