import * as React from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setProjectOwner, setProjectBudget, setProjectStatus } from '../../slices/RecordsSlice';

interface recordType {
  id: string,
  title: string,
  division: string,
  project_owner: string,
  budget: number,
  status: string,
  created: string,
  modified: null | string,
}

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-input': {
    padding: '8px 16px',
  }
});

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

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const BasicCard = (props: recordType) => {
  const {
    id,
    title,
    division,
    project_owner,
    budget,
    status,
    created,
    modified,
  } = props;
  const productOwners = useAppSelector((state) => state.records.productOwners);
  const productStatus = useAppSelector((state) => state.records.productStatus);
  const dispatch = useAppDispatch();

  const onProductOwnersChange = (event: SelectChangeEvent<unknown>) => {
    dispatch(setProjectOwner({ id, project_owner: event!.target!.value }));
  };

  const onBudgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setProjectBudget({ id, budget: event!.target!.value }));
  };

  const onProductStatusChange = (event: SelectChangeEvent<unknown>) => {
    dispatch(setProjectStatus({ id, status: event!.target!.value }));
  }

  return (
    <Card sx={{ maxWidth: '20%', margin: '16px' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <StyledTextField
          label="Division" 
          variant="outlined"
          defaultValue={division}
          margin="dense"
          fullWidth
          disabled
        />
        <FormControl margin="dense" fullWidth>
          <InputLabel id="product-owner-label">Project Owner</InputLabel>
          <StyledSelect
            labelId="product-owner-label"
            id="product-owner"
            value={project_owner}
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
            value={budget}
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
            value={status}
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
        <StyledTextField
          label="Created on" 
          variant="outlined"
          defaultValue={created || ''}
          margin="dense"
          fullWidth
          disabled
        />
        <StyledTextField
          label="Modified on" 
          variant="outlined"
          defaultValue={modified || '?'}
          margin="dense"
          fullWidth
          disabled
        />
      </CardContent>
      <CardActions>
        <Button size="small">Project Details</Button>
      </CardActions>
    </Card>
  );
}

export default BasicCard;
