import BottomPanel from '../BottomPanel';
import { ErrorAlert } from '../ErrorAlert';
import { Identity } from '../Identity';
import InfoModal from '../InfoModal';
import Map from '../Map';

const App = () => {
  return (
    <>
      <Map></Map>
      <BottomPanel></BottomPanel>
      <ErrorAlert></ErrorAlert>
      <Identity></Identity>
      <InfoModal></InfoModal>
    </>
  );
};

export default App;
