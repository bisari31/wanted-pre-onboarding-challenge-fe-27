export const AUTH_KEY_NAME = 'credentials';

const auth = {
  get: () => {
    const credentials = localStorage.getItem(AUTH_KEY_NAME);
    if (credentials) {
      return JSON.parse(credentials)?.state?.credentials;
    }
    return null;
  },
};

export default auth;
