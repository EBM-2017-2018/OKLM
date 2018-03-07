const BASE_URL = '/api';

export const getUserDocs = () => fetch(BASE_URL + '/documents').then(res => res.json());
