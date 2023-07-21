import { CalciteAlert } from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-alert';
import { useAppSelector } from '../../hooks/useAppSelector';

export const ErrorAlert = () => {
  const error = useAppSelector((state) => state.error);
  if (error.name || error.message) {
    return (
      <CalciteAlert icon='rangefinder' kind='danger' open label='Loading error' placement='bottom-end'>
        <div slot='title'>{error.name}</div>
        <div slot='message'>{error.message}</div>
      </CalciteAlert>
    );
  } else {
    return null;
  }
};
