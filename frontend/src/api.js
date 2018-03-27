import { getAuthHeaders, checkAuthResponse } from 'ebm-auth/dist/browser';

const BASE_URL = '/api';

const handleHttpErrors = response => {
  if (!response.ok) {
    throw response;
  }
  return response;
};

const apiFetch = (url, options = {}) => fetch(BASE_URL + url, {
  ...options,
  headers: getAuthHeaders(options.headers)
}).then(checkAuthResponse).then(handleHttpErrors)

export const createDoc = ({ title, uri, file, motherCategory }) => {
  if (file) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('motherCategory', motherCategory);
    fd.append('file', file);

    return apiFetch('/documents', {
      method: 'POST',
      body: fd,
    }).then(res => res.json())

  } else {
    return apiFetch('/documents', {
      method: 'POST',
      body: JSON.stringify({ title, uri, motherCategory }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
  }
};

export const getTopLevelCategories = () => apiFetch('/categories').then(handleHttpErrors).then(res => res.json());

export const getCategory = id => apiFetch(`/categories/${id}`).then(res => res.json());

export const getCategoryContent = id => apiFetch(`/categories/${id}?content=all`).then(res => res.json());

export const addCategory = (title, parentId) => apiFetch('/categories', {
  method: 'POST',
  body: JSON.stringify({ name: title, motherCategory: parentId }),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => res.json());

export const getCategories = () => apiFetch('/categories').then(res => res.json());

export const getUsers = () => apiFetch('/users').then(res => res.json());

export const getDocument = id => apiFetch(`/documents/${id}`).then(res => res.json());

export const getUserDocs = () => apiFetch('/users/me/documents').then(res => res.json());

export const search = (query, types) => apiFetch('/search?q=' + encodeURIComponent(query)).then(res => res.json());

export const whoami = () => apiFetch('/users/who');
