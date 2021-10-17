import React from 'react';
import Records from '../Records';
import Dialog from '../../components/Dialog';
import Snackbar from '../../components/Snackbar';
import { useAppDispatch } from '../../hooks';
import { setRecordsList } from '../../slices/RecordsSlice';

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(setRecordsList());
  }, []);

  return (
    <>
      <Records />
      <Dialog />
      <Snackbar />
    </>
  );
}

export default App;
