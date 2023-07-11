import * as styles from './CountriesMenu.module.css';
import '@esri/calcite-components/dist/components/calcite-select';
import '@esri/calcite-components/dist/components/calcite-option';
import '@esri/calcite-components/dist/components/calcite-label';
import '@esri/calcite-components/dist/components/calcite-radio-button-group';
import '@esri/calcite-components/dist/components/calcite-radio-button';
import { CalciteSelect, CalciteOption } from '@esri/calcite-components-react';

import { RootState } from '../../store/storeConfiguration';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { zoomToCountry } from '../../store/services/country-selection/country-thunk';
import { DSVRowArray } from 'd3';

const CountriesMenu = ({ data }: { data: DSVRowArray<string> }) => {
  const selectedCountry = useSelector((state: RootState) => state.country);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.container}>
      {data && (
        <div className={styles.countrySelection}>
          <CalciteSelect
            scale={'m'}
            label={'Select a country'}
            style={{ paddingLeft: '4px' }}
            onCalciteSelectChange={(event) => {
              const country = event.target.selectedOption.value;
              if (country === 'None') {
                dispatch(zoomToCountry({ name: null, selectedFromMap: false }));
              } else {
                dispatch(zoomToCountry({ name: country, selectedFromMap: false }));
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
