import { useState } from 'react';

export const useFilters = () => {
  const [filters, setFilters] = useState({
    style: '',
    teacher: '',
    date: '',
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    filters,
    updateFilter,
  };
};

