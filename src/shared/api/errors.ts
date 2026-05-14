export type AppError = {
  code: string;
  message: string;
  status?: number;
  retryable: boolean;
};

export function toAppError(error: unknown): AppError {
  if (error && typeof error === 'object' && 'message' in error) {
    return {
      code: 'unknown_error',
      message: String(error.message),
      retryable: true,
    };
  }

  return {
    code: 'unknown_error',
    message: 'Não foi possível concluir a operação.',
    retryable: true,
  };
}
