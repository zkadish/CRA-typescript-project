import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setAppSnackBar } from '../../slices/AppSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface State {
  open: boolean,
  severity: string,
  vertical: 'top',
  horizontal: 'center',
}

export default function PositionedSnackbar() {
  const appSnackbar = useAppSelector((state) => state.app.appSnackbar);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setAppSnackBar({ open: false, message: '' }));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={appSnackbar.open}
      onClose={handleClose}
      message="I love snacks"
      key="top-center-snackbar"
      autoHideDuration={6000}
    >
      <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
        {appSnackbar.message}
      </Alert>
    </Snackbar>
  );
}
