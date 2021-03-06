import * as React from 'react';
import PropTypes from 'prop-types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setAppModal } from '../../slices/AppSlice';
import { setFliterSettings, onFilterRecords } from '../../slices/RecordsSlice';
import { styled } from '@mui/material/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  InputAdornment,
  OutlinedInput
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DatePicker from '../DatePicker';
import { DateRange } from '@mui/lab/DateRangePicker';

const StyledSelect = styled(Select)({
  '&.MuiOutlinedInput-root': {
    '& .MuiSelect-select': {
      padding: '8px 16px',
    }
  }
});

const StyledOutlinedInput = styled(OutlinedInput)({
  '& .MuiOutlinedInput-input': {
    padding: '8px 16px',
  }
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
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

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs() {
  const filterSettings = useAppSelector((state) => state.records.filterSettings);
  const productDivisons = useAppSelector((state) => state.app.productDivisons);
  const productOwners = useAppSelector((state) => state.app.productOwners);
  const productStatus = useAppSelector((state) => state.app.productStatus);
  const appModal = useAppSelector((state) => state.app.appModal);
  const dispatch = useAppDispatch();


  const handleClose = () => {
    dispatch(setAppModal({
      open: false,
      type: 'recordsModal',
    }));
  };

  const onDivisionsChange = (event: SelectChangeEvent<unknown>) => {
    dispatch(setFliterSettings({ ...filterSettings, division: event.target.value as string }));
    dispatch(onFilterRecords());
  };

  const onProductOwnersChange = (event: SelectChangeEvent<unknown>) => {
    dispatch(setFliterSettings({ ...filterSettings, project_owner: event.target.value as string }));
    dispatch(onFilterRecords());
  };

  const onBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: allow for decimal points
    const value = Number(event.target.value);
    dispatch(setFliterSettings({ ...filterSettings, budget: value }));
    dispatch(onFilterRecords());
  };

  const onProductStatusChange = (event: SelectChangeEvent<unknown>) => {
    dispatch(setFliterSettings({ ...filterSettings, status: event.target.value as string }));
    dispatch(onFilterRecords());
  };

  const setCreatedDateRange = (dates: DateRange<Date | null>) => {
    dispatch(setFliterSettings({ ...filterSettings, createdRange: dates }));
    dispatch(onFilterRecords());
  };

  const setModifiedDateRange = (dates: DateRange<Date | null>) => {
    dispatch(setFliterSettings({ ...filterSettings, modifiedRange: dates }));
    dispatch(onFilterRecords());
  };

  const onClear = () => {
    dispatch(setFliterSettings({
      division: 'All',
      project_owner: 'All',
      budget: 0,
      status: 'All',
      createdRange: [null, null],
      modifiedRange: [null, null],
      searchKey: '',
    }));
    dispatch(onFilterRecords());
  }

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={appModal.open && appModal.type === 'recordsFilter'}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Records filters
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <FormControl margin="dense" fullWidth>
            <InputLabel id="division-label">Division</InputLabel>
            <StyledSelect
              labelId="division-label"
              id="division"
              value={filterSettings.division}
              label="Division"
              onChange={onDivisionsChange}
            >
              {productDivisons.map(division => {
                return (
                  <MenuItem key={division} value={division}>{division}</MenuItem>
                )
              })}
            </StyledSelect>
          </FormControl>
          <FormControl margin="dense" fullWidth>
            <InputLabel id="product-owner-label">Project Owner</InputLabel>
            <StyledSelect
              labelId="product-owner-label"
              id="product-owner"
              value={filterSettings.project_owner}
              label="Project Owner"
              onChange={onProductOwnersChange}
            >
              {productOwners.map(owner => {
                return (
                  <MenuItem key={owner} value={owner}>{owner}</MenuItem>
                )
              })}
            </StyledSelect>
          </FormControl>
          <FormControl margin="dense" fullWidth>
          <InputLabel htmlFor="outlined-adornment-budget">Budget</InputLabel>
            <StyledOutlinedInput
              id="outlined-adornment-budget"
              value={filterSettings.budget}
              onChange={onBudgetChange}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Budget"
            />
          </FormControl>
          <FormControl margin="dense" fullWidth>
            <InputLabel id="product-status-label">Project Status</InputLabel>
            <StyledSelect
              labelId="product-status-label"
              id="product-status"
              value={filterSettings.status}
              label="Project Status"
              onChange={onProductStatusChange}
            >
              {productStatus.map(status => {
                return (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                )
              })}
            </StyledSelect>
          </FormControl>
          <div>
            <DatePicker
              startText="Created from"
              endText="Created to"
              range={filterSettings.createdRange}
              setDateRange={setCreatedDateRange}
            />
            <DatePicker
              startText="Modified from"
              endText="Modified to"
              range={filterSettings.modifiedRange}
              setDateRange={setModifiedDateRange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClear}>
            clear
          </Button>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
