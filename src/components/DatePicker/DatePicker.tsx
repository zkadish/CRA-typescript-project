import * as React from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

type propsTypes = {
  startText: string,
  endText: string,
  // date?: string | null,
  setDateRange: (dates: DateRange<Date | null>) => void,
}

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-input': {
    padding: '8px 16px',
  }
});

export default function BasicDateRangePicker(props: propsTypes) {
  const {
    startText,
    endText,
    setDateRange,
  } = props;
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText={startText}
        endText={endText}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setDateRange(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <StyledTextField margin="dense" {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <StyledTextField margin="dense" {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}