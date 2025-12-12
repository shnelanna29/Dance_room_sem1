import { API_BASE } from '../../../shared/api/base-api';

export const teachersApi = {
  getTeachers: () =>
    fetch(`${API_BASE}/teachers`).then((r) => r.json()),
};

