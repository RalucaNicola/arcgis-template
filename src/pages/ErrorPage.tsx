import { useSelector } from 'react-redux';
import { RootState } from '../store/storeConfiguration';

const ErrorPage = () => {
  const appLoadingError = useSelector((state: RootState) => state.appLoading.error);
  return (
    <div>
      <p>Hello there! It looks like you're lost :)</p>
    </div>
  );
};

export default ErrorPage;
