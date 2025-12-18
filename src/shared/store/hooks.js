import { useDispatch, useSelector } from 'react-redux';
// При TypeScript импорты RootState, AppDispatch
// import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

