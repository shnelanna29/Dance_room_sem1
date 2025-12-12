import { API_BASE } from '../../../shared/api/base-api';

export const stylesApi = {
  getStyles: () =>
    fetch(`${API_BASE}/styles`).then((r) => r.json()),
};

