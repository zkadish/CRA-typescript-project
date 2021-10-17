import * as React from 'react';
import PropTypes from 'prop-types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setAppModal } from '../../slices/AppSlice';
import { setFliterSettings, setFliteredList, onFilterRecords } from '../../slices/RecordsSlice';
import { styled } from '@mui/material/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
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
  const list = useAppSelector((state) => state.records.list);
  const filteredList = useAppSelector((state) => state.records.filteredList);
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
    dispatch(setFliterSettings({ division: event.target.value as string}));
  };

  const onProductOwnersChange = (event: SelectChangeEvent<unknown>) => {
    dispatch(setFliterSettings({ project_owner: event.target.value as string}));
  };

  const onBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO: allow for decimal points
    const value = Number(event.target.value);
    dispatch(setFliterSettings({ budget: value}));
  };

  const onProductStatusChange = (event: SelectChangeEvent<unknown>) => {
    dispatch(setFliterSettings({ status: event.target.value as string}));
  };

  // const onCreatedFromChange = (value: Date | null) => {
  //   const fromDateString = `${value?.getMonth()}/${value?.getDay()}/${value?.getFullYear()}`; 
  //   dispatch(setFliterSettings({ createdFrom: fromDateString }));
  //   // debugger
  //   const newList = filteredList.filter(record => {
  //     const recordDate = new Date(record.created);
  //     const fromDate = new Date(fromDateString);
  //     return recordDate > fromDate;
  //   });

  //   dispatch(setFliteredList(newList));
  // };

  // const onCreatedToChange = (value: Date | null) => {
  //   const fromDateString = `${value?.getUTCMonth()}/${value?.getUTCDay()}/${value?.getUTCFullYear()}`;
  //   // debugger
  //   dispatch(setFliterSettings({ createdFrom: fromDateString }));
  //   // debugger
  //   const newList = filteredList.filter(record => {
  //     const recordDate = new Date(record.created);
  //     const fromDate = new Date(fromDateString);
  //     return recordDate > fromDate;
  //   });
  // };

  const setCreatedDateRange = (dates: DateRange<Date | null>) => {
    dispatch(setFliterSettings({ createdRange: dates}));
  };

  const setModifiedDateRange = (dates: DateRange<Date | null>) => {
    dispatch(setFliterSettings({ modifiedRange: dates }));
  };

  const onFilter = () => {
    dispatch(onFilterRecords());
    // const filterKeys = Object.keys(filterSettings);
    // debugger
    // let result = list.map(r => ({ ...r }));
    // filterKeys.forEach((key) => {
    //   debugger
    //   switch (key) {
    //     case 'division':
    //       if (filterSettings[key] === 'All') break;
    //       result = result.filter(r => {
    //         const test = r[key] === filterSettings[key];
    //         return test;
    //       });
    //       // debugger
    //       break;
    //     case 'project_owner':
    //       if (filterSettings[key] === 'All') break;
    //       result = result.filter(r => {
    //         const test = r[key] === filterSettings[key];
    //         return test;
    //       });
    //       // debugger
    //       break;
    //     case 'status':
    //       if (filterSettings[key] === 'All') break;
    //       result = result.filter(r => {
    //         const test = r[key] === filterSettings[key]?.toLowerCase();
    //         return test;
    //       });
    //       // debugger
    //       break;
    //     case 'budget':
    //       result = result.filter(r => {
    //         const test = r[key] >= Number(filterSettings[key]);
    //         return test;
    //       });
    //       // debugger
    //       break;
    //     case 'createdRange':
    //       if (filterSettings[key]?.[0] === null && filterSettings[key]?.[1] === null) break;
    //       if (filterSettings[key]?.[0] !== null) {
    //         result = result.filter(r => {
    //           // @ts-ignore: Object is possibly 'null'.
    //           const test = new Date(r.created) >= new Date(filterSettings.createdRange[0]);
    //           return test;
    //         });
    //         debugger
    //       }
    //       if (filterSettings[key]?.[1] !== null) {
    //         result = result.filter(r => {
    //           // @ts-ignore: Object is possibly 'null'.
    //           const test = new Date(r.created) <= new Date(filterSettings.createdRange[1]);
    //           return test;
    //         });
    //         debugger
    //       }
    //       debugger
    //       break;
    //     case 'modifiedRange':
    //       if (filterSettings[key]?.[0] === null && filterSettings[key]?.[1] === null) break;
    //       if (filterSettings[key]?.[0] !== null) {
    //         result = result.filter(r => {
    //           // @ts-ignore: Object is possibly 'null'.
    //           const test = new Date(r.modified) >= new Date(filterSettings.modifiedRange[0]);
    //           return test;
    //         });
    //         debugger
    //       }
    //       if (filterSettings[key]?.[1] !== null) {
    //         result = result.filter(r => {
    //           // @ts-ignore: Object is possibly 'null'.
    //           const test = new Date(r.modified) <= new Date(filterSettings.modifiedRange[1]);
    //           return test;
    //         });
    //         debugger
    //       }
    //       debugger
    //       break;
    //     default:
    //       // do nothing
    //   }
    //   dispatch(setFliteredList(result));
    // });

    // dispatch(setAppModal({
    //   open: false,
    //   type: 'recordsModal',
    // }));
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={appModal.open}
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
              setDateRange={setCreatedDateRange}
            />
            <DatePicker
              startText="Modified from"
              endText="Modified to"
              setDateRange={setModifiedDateRange}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            clear
          </Button>
          <Button autoFocus onClick={onFilter}>
            Filter
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
