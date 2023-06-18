import * as styles from './CountriesMenu.module.css';
import '@esri/calcite-components/dist/components/calcite-select';
import '@esri/calcite-components/dist/components/calcite-option';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-radio-button-group';
import '@esri/calcite-components/dist/components/calcite-radio-button';
import { CalciteSelect, CalciteOption } from '@esri/calcite-components-react';

import { RootState } from '../../store/storeConfiguration';
import { useDispatch, useSelector } from 'react-redux';
import { setCountry } from '../../store/slices/country-slice';
import { countryDataUrl } from '../../config';
import { useFetchData } from '../../hooks/useFetchCSV';

const CountriesMenu = () => {
  const selectedCountry = useSelector((state: RootState) => state.country);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchData(countryDataUrl);
  console.log('CountriesMenu rendered');

  return (
    <div className={styles.container}>
      {error && <div>There was an error loading the data.</div>}
      {isLoading && <div>Loading...</div>}
      {data && !isLoading && !error && (
        <div className={styles.countrySelection}>
          <CalciteSelect
            scale={'m'}
            label={'Select a country'}
            style={{ paddingLeft: '4px' }}
            onCalciteSelectChange={(event) => {
              const country = event.target.selectedOption.value;
              if (country === 'None') {
                dispatch(setCountry({ name: null, selectedFromMap: false }));
              } else {
                dispatch(setCountry({ name: country, selectedFromMap: false }));
              }
            }}
          >
            {data
              .sort((a, b) => {
                return a.country.localeCompare(b.country, 'en', { sensitivity: 'base' });
              })
              .map((feature, index) => (
                <CalciteOption
                  key={index}
                  selected={selectedCountry && selectedCountry.name === feature.country ? true : null}
                >
                  {feature.country}
                </CalciteOption>
              ))}
            <CalciteOption selected={selectedCountry && selectedCountry.name ? null : true}>None</CalciteOption>
          </CalciteSelect>
        </div>
      )}
    </div>
  );
};

export default CountriesMenu;
