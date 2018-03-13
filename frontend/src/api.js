const BASE_URL = '/api';

const handleHttpErrors = response => {
  if (!response.ok) {
    throw response;
  }
  return response;
};

export const createDoc = ({title, uri, author, motherCategory}) => {
  return fetch(`${BASE_URL}/documents`, {
    method: 'POST',
    body: JSON.stringify({title, uri, author, motherCategory}),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(handleHttpErrors)
    .then(res => res.json())
};

export const getTopLevelCategories = () => fetch(`${BASE_URL}/categories`).then(handleHttpErrors).then(res => res.json());

export const getUsers = () => fetch(`${BASE_URL}/users`).then(handleHttpErrors).then(res => res.json());

export const getUserDocs = () => fetch(BASE_URL + '/documents').then(handleHttpErrors).then(res => res.json());
