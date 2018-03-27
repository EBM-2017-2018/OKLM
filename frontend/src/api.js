import { getAuthHeaders, checkAuthResponse } from 'ebm-auth/dist/browser';

const BASE_URL = '/api';

const handleHttpErrors = response => {
  if (!response.ok) {
    throw response;
  }
  return response;
};

export const createDoc = ({ title, uri, file, motherCategory }) => {
  if (file) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('motherCategory', motherCategory);
    fd.append('file', file);

    return fetch(`${BASE_URL}/documents`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: fd,
    })
      .then(checkAuthResponse)
      .then(handleHttpErrors)
      .then(res => res.json())

  } else {
    return fetch(`${BASE_URL}/documents`, {
      method: 'POST',
      body: JSON.stringify({ title, uri, motherCategory }),
      headers: getAuthHeaders({
        'Content-Type': 'application/json'
      })
    })
      .then(checkAuthResponse)
      .then(handleHttpErrors)
      .then(res => res.json())
  }
};

export const getTopLevelCategories = () => fetch(`${BASE_URL}/categories`).then(handleHttpErrors).then(res => res.json());
export const getCategory = id => fetch(`${BASE_URL}/categories/${id}`).then(handleHttpErrors).then(res => res.json());
export const getCategoryContent = id => fetch(`${BASE_URL}/categories/${id}?content=all`).then(handleHttpErrors).then(res => res.json());
export const addCategory = (title, parentId) => fetch(`${BASE_URL}/categories`, {
  method: 'POST',
  body: JSON.stringify({ name: title, motherCategory: parentId }),
  headers: getAuthHeaders({
    'Content-Type': 'application/json'
  })
}).then(checkAuthResponse).then(handleHttpErrors).then(res => res.json());
export const getCategories = () => fetch(`${BASE_URL}/categories`).then(handleHttpErrors).then(res => res.json());

export const getDocument = id => fetch(`${BASE_URL}/documents/${id}`).then(handleHttpErrors).then(res => res.json());

export const getUsers = () => fetch(`${BASE_URL}/users`).then(handleHttpErrors).then(res => res.json());

export const getUserDocs = () => fetch(BASE_URL + '/documents').then(handleHttpErrors).then(res => res.json());

export const search = (query, types) => fetch(BASE_URL + '/search?q=' + encodeURIComponent(query)).then(res => res.json());
