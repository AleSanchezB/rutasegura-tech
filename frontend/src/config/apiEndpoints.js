export const API_ENDPOINTS = {
    AUTH: {
        GOOGLE:         '/auth/google/',
        LOGIN:         '/auth/login/',
      VERIFY_TOKEN:  '/auth/verify-token/',
      REFRESH_TOKEN: '/auth/refresh/',
    },

    USERS: {
      CREATE:  '/users/',
      GET:     (id) => `/users/${id}/`,
      GET_ALL:    '/users/',
      UPDATE:  (id) => `/users/${id}/`,
      DELETE:  (id) => `/users/${id}/`,
    },

    ROUTES: {
        CREATE: '/routes/',
        GET: (id) => `/routes/${id}/`,
        GET_ALL: '/routes/',
        UPDATE: (id) => `/routes/${id}/`,
        DELETE: (id) => `/routes/${id}/`,
    },
};
  
