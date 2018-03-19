const BASE_URL = '/api';

const handleHttpErrors = response => {
  if (!response.ok) {
    throw response;
  }
  return response;
};

export const createDoc = ({title, uri, file, author, motherCategory}) => {
  if (file) {
    const fd = new FormData();
    fd.append('title', title);
    fd.append('author', author);
    fd.append('motherCategory', motherCategory);
    fd.append('file', file);

    return fetch(`${BASE_URL}/documents`, {
      method: 'POST',
      body: fd,
    })
      .then(handleHttpErrors)
      .then(res => res.json())

  } else {
    return fetch(`${BASE_URL}/documents`, {
      method: 'POST',
      body: JSON.stringify({title, uri, author, motherCategory}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(handleHttpErrors)
      .then(res => res.json())
  }
};

export const getTopLevelCategories = () => fetch(`${BASE_URL}/categories`).then(handleHttpErrors).then(res => res.json());

export const getUsers = () => fetch(`${BASE_URL}/users`).then(handleHttpErrors).then(res => res.json());

export const getUserDocs = () => fetch(BASE_URL + '/documents').then(handleHttpErrors).then(res => res.json());

export const search = (query, types) => fetch(BASE_URL + '/search?q=' + encodeURIComponent(query)).then(res => res.json());
