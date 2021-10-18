import * as React from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setAppModal } from '../../slices/AppSlice';
// import { setFliterSettings, onFilterRecords } from '../../slices/RecordsSlice';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '600px',
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

interface objDataType {
  [key: string]: string,
}

const divObj: objDataType = {
  accounting: '0',
  administration: '0',
  marketing: '0',
  production: '0',
  sales: '0',
}

const ownObj: objDataType = {
  'Eugene Brown': '0',
  'Kevin Snyder': '0',
  'Killgore Trout': '0',
  'James Holden': '0',
  'Michelle Webb': '0',
  'Nicole Smith': '0',
  'Richard Henry': '0',
}

const statObj: objDataType = {
  new: '0',
  working: '0',
  delivered: '0',
  archived: '0',
}

export default function CustomizedDialogs() {
  const [divisionNum, setDivisionNum] = React.useState<objDataType>({});
  const [projectOwnerNum, setProjectOwnerNum] = React.useState<objDataType>({});
  const [statusNum, setStatusNum] = React.useState<objDataType>({});
  const [averageBudget, setAverageBudget] = React.useState<string>('0');
  const appModal = useAppSelector((state) => state.app.appModal);
  const filteredList = useAppSelector((state) => state.records.filteredList);
  const filterSettings = useAppSelector((state) => state.records.filterSettings);
  const productDivisons = useAppSelector((state) => state.records.productDivisons);
  const productOwners = useAppSelector((state) => state.records.productOwners);
  const productStatus = useAppSelector((state) => state.records.productStatus);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setAppModal({ open: false, type: 'analytics' }));
  };
  
  React.useEffect(() => {
    productDivisons.forEach((div) => {
      const num = filteredList.reduce((acum, num) => {
        if (num.division === div) return acum + 1;
        return acum;
      }, 0);
      divObj[div.toLowerCase()] = `${num}`;
    });
    setDivisionNum(divObj);

    productOwners.forEach((owner) => {
      const num = filteredList.reduce((acum, num) => {
        if (num.project_owner === owner) return acum + 1;
        return acum;
      }, 0);
      ownObj[owner.toLowerCase()] = `${num}`;
    });
    // debugger
    setProjectOwnerNum(ownObj);

    productStatus.forEach((status) => {
      const num = filteredList.reduce((acum, num) => {
        if (num.status === status) return acum + 1;
        return acum;
      }, 0);
      statObj[status.toLowerCase()] = `${num}`;
    });
    setStatusNum(statObj);
  }, [
    divisionNum,
    projectOwnerNum,
    statusNum,
    filteredList,
    productDivisons,
    productOwners,
    productStatus,
  ]);

  React.useEffect(() => {
    const total = filteredList.reduce((acum, ele) => acum + ele.budget, 0);
    const average = (total / filteredList.length).toFixed(2);
    setAverageBudget(average);
  }, [averageBudget, filteredList]);

  return (
    <div className="analytics">
      <BootstrapDialog
        className="analytics"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={appModal.open && appModal.type === 'analytics'}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Analytics at a Glance
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div style={{ margin: '0 0 24px' }}>
            <Typography gutterBottom>Number of projects by division:</Typography>
            {/* <Divider /> */}
            {productDivisons.map(division => {
              if (filterSettings.division.toLowerCase().includes('all')) {
                return (
                  <div key={division}>
                    <span>{division}:</span>{' '}<span>{divisionNum[division.toLowerCase()]}</span>
                  </div>
                )
              }
              if (divisionNum[division.toLowerCase()] === '0') return null;
              return (
                <div key={division}>
                  <span>{division}:</span>{' '}<span>{divisionNum[division.toLowerCase()]}</span>
                </div>
              )
            })}
          </div>
          <div style={{ margin: '0 0 24px' }}>
            <Typography gutterBottom>Number of projects by project owner:</Typography>
            {/* <Divider /> */}
            {productOwners.map(owner => {
              if (filterSettings.project_owner.toLowerCase().includes('all')) {
                return (
                  <div key={owner}>
                    <span>{owner}:</span>{' '}<span>{projectOwnerNum[owner.toLowerCase()]}</span>
                  </div>
                )
              }
              if (projectOwnerNum[owner.toLowerCase()] === '0') return null;
              return (
                <div key={owner}>
                  <span>{owner}:</span>{' '}<span>{projectOwnerNum[owner.toLowerCase()]}</span>
                </div>
              )
            })}
          </div>
          <div style={{ margin: '0 0 24px' }}>
            <Typography gutterBottom>Number of projects by project owner:</Typography>
            {/* <Divider /> */}
            {productStatus.map(status => {
              if (filterSettings.status.toLowerCase().includes('all')) {
                return (
                  <div key={status}>
                    <span>{status}:</span>{' '}<span>{statusNum[status.toLowerCase()]}</span>
                  </div>
                )
              }
              if (statusNum[status.toLowerCase()] === '0') return null;
              return (
                <div key={status}>
                  <span>{status}:</span>{' '}<span>{statusNum[status.toLowerCase()]}</span>
                </div>
              )
            })}
          </div>
          <Typography gutterBottom>Project Budget Average: {averageBudget}</Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
