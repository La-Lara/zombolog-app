export type UserSession = {
  accessToken: string;
  user: {
    id: string;
    displayName: string;
    username: string;
  };
};
