import { CalciteAlert } from '@esri/calcite-components-react';
import '@esri/calcite-components/dist/components/calcite-alert';
import { useAppSelector } from '../../hooks/useAppSelector';

export const ErrorAlert = () => {
  const error = useAppSelector((state) => state.appLoading.error);
  console.log(error);
  if (error) {
    return (
      <CalciteAlert icon='rangefinder' kind='brand' open label='A report alert' placement='bottom-end'>
        <div slot='title'>{error.name}</div>
        <div slot='message'>{error.message}</div>
      </CalciteAlert>
    );
  } else {
    return null;
  }
};
