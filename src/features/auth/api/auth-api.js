import { API_BASE } from '../../../shared/api/base-api';

export const authApi = {
  getUsers: () =>
    fetch(`${API_BASE}/users`).then((r) => r.json()),

  postUser: (user) =>
    fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }).then((r) => r.json()),
};

