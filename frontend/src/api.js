const BASE_URL = '/api';

export const getUserDocs = () => fetch(BASE_URL + '/getUserDocs').then(res => res.json());
