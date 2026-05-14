export type UserSession = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    displayName: string;
    username: string;
  };
};

export type AuthCredentials = {
  username: string;
  password: string;
};

export type RegisterCredentials = AuthCredentials & {
  displayName: string;
};
