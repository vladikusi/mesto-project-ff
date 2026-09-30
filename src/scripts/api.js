const config = {
  baseUrl: 'https://nomoreparties.co/v1/higher-front-back-dev_cohort_01',
  headers: {
    authorization: '9977a0d4-4552-47e6-9b72-a90bd77e3bc4',
    'Content-Type': 'application/json',
  },
};

const request = (path, options = {}) => {
  return fetch(`${config.baseUrl}/${path}`, {
    ...options,
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const getInitialCards = () => {
  return request('cards');
};

export const getUser = () => {
  return request('users/me');
};

export const profilePatch = (user) => {
  return request('users/me', {
    method: 'PATCH',
    body: JSON.stringify({
      name: user.name,
      about: user.about,
    }),
  });
};

export const cardPost = (card) => {
  return request('cards', {
    method: 'POST',
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  });
};

export const cardDelete = (cardId) => {
  return request(`cards/${cardId}`, {
    method: 'DELETE',
  });
};

export const cardLike = (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: 'PUT',
  });
};

export const cardUnlike = (cardId) => {
  return request(`cards/likes/${cardId}`, {
    method: 'DELETE',
  });
};

export const patchAvatar = (avatar) => {
  return request(`users/me/avatar`, {
    method: 'PATCH',
    body: JSON.stringify({
      avatar: avatar,
    }),
  });
};
