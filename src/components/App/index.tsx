import BottomPanel from '../BottomPanel';
import CountriesLayer from '../CountriesLayer';
import { ErrorAlert } from '../ErrorAlert';
import { Identity } from '../Identity';
import Map from '../Map';

const App = () => {
  return (
    <>
      <Map>
        <CountriesLayer></CountriesLayer>
      </Map>
      <BottomPanel></BottomPanel>
      <ErrorAlert></ErrorAlert>
      <Identity></Identity>
    </>
  );
};

export default App;
