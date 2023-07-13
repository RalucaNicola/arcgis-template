import { CalciteAlert } from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-alert';
import { useAppSelector } from '../../hooks/useAppSelector';

export const ErrorAlert = () => {
  const loadingError = useAppSelector((state) => state.appLoading.error);
  if (loadingError) {
    return (
      <CalciteAlert icon='rangefinder' kind='brand' open label='Loading error' placement='bottom-end'>
        <div slot='title'>{loadingError.name}</div>
        <div slot='message'>{loadingError.message}</div>
      </CalciteAlert>
    );
  } else {
    return null;
  }
};
