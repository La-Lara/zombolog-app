import * as SecureStore from 'expo-secure-store';

const refreshTokenKey = 'project-zomboid-profile.refresh-token';

export const sessionStorage = {
  getRefreshToken() {
    return SecureStore.getItemAsync(refreshTokenKey);
  },

  setRefreshToken(refreshToken: string) {
    return SecureStore.setItemAsync(refreshTokenKey, refreshToken);
  },

  deleteRefreshToken() {
    return SecureStore.deleteItemAsync(refreshTokenKey);
  },
};
