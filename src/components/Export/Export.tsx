import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setAppModal } from '../../slices/AppSlice';
import { styled } from '@mui/material/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  // Typography,
} from '@mui/material';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '400px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function CustomizedDialogs() {
  const appModal = useAppSelector((state) => state.app.appModal);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setAppModal({ open: false, type: 'export' }));
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={appModal.open && appModal.type === 'export'}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Export to file
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select file type</FormLabel>
          <RadioGroup
            aria-label="file type"
            defaultValue="Excel"
            name="radio-buttons-group"
          >
            <FormControlLabel value="Excel" control={<Radio />} label="Excel" />
            <FormControlLabel value="PDF" control={<Radio />} label="PDF" />
          </RadioGroup>
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Export
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
