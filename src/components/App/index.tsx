import BottomPanel from '../BottomPanel';
import CountriesLayer from '../CountriesLayer';
import { ErrorAlert } from '../ErrorAlert';
import Map from '../Map';

const App = () => {
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
