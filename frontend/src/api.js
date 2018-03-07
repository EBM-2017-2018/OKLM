const BASE_URL = '/api';

export const getUserDocs = () => fetch(BASE_URL + '/getUserDocs').then(res => res.json());

export const createDoc = ({title, uri, author, motherCategory}) => {
  return fetch(`${BASE_URL}/documents`, {
    method: 'POST',
    body: JSON.stringify({title, uri, author, motherCategory}),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(res => res.json())
};

export const getTopLevelCategories = () => fetch(`${BASE_URL}/categories`).then(res => res.json());

export const getUsers = () => fetch(`${BASE_URL}/users`).then(res => res.json());
