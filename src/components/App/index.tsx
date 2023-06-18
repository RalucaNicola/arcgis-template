//import map component
import BottomPanel from '../BottomPanel';
import CountriesLayer from '../CountriesLayer';
import CountriesMenu from '../CountriesMenu';
import Map from '../Map';

const App = () => {
  console.log('App rendered');
  return (
    <>
      <Map>
        <CountriesLayer></CountriesLayer>
      </Map>
      <BottomPanel>
        <CountriesMenu></CountriesMenu>
      </BottomPanel>
    </>
  );
};

export default App;
