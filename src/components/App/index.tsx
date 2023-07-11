import { useAppSelector } from '../../hooks/useAppSelector';
import { getEutrophicationData } from '../../store/globals/eutrophicationData';
import BottomPanel from '../BottomPanel';
import CountriesLayer from '../CountriesLayer';
import { ErrorAlert } from '../ErrorAlert';
import Map from '../Map';

const App = () => {
  console.log('App rendered');

  return (
    <>
      <Map>
        <CountriesLayer></CountriesLayer>
      </Map>
      <BottomPanel></BottomPanel>
      <ErrorAlert></ErrorAlert>
    </>
  );
};

export default App;
