import React from 'react';
import Records from '../Records';
import Dialog from '../Dialog';
import Snackbar from '../../components/Snackbar';
import { useAppDispatch } from '../../hooks';
import { setRecordsList } from '../../slices/RecordsSlice';

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setRecordsList());
  }, [dispatch]);

  return (
    <>
      <Records />
      <Dialog />
      <Snackbar />
    </>
  );
}

export default App;
