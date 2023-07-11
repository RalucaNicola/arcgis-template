import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store/storeConfiguration';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
