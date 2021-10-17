import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { DateRange } from '@mui/lab/DateRangePicker';
import {
  records,
  productDivisons,
  productOwners,
  productStatus,
} from '../mockData/records';

const shortid = require('shortid');

type recordType = {
  id?: string,
  title: string,
  division: string,
  project_owner: string,
  budget: number,
  status: string,
  created: string,
  modified: null | string,
}

type filterSettingsType = {
  searchKey?: string,
  division?: string,
  project_owner?: string,
  budget?: number,
  status?: string,
  createdRange?: DateRange<Date | null>,
  modifiedRange?: DateRange<Date | null>,
  // createdFrom?: Date | null,
  // createdTo?: Date | null,
  // modifiedFrom?: Date | null,
  // modifiedTo?: Date | null,
}

// Define a type for the slice state
interface RecordsState {
  list: recordType[],
  filteredList: recordType[],
  filterSettings: filterSettingsType,
  productDivisons: string[],
  productOwners: string[],
  productStatus: string[],
}

// Define the initial state using that type
const initialState: RecordsState = {
  list: records,
  filteredList: records,
  filterSettings: {
    searchKey: '',
    division: 'All',
    project_owner: 'All',
    budget: 0,
    status: 'All',
    createdRange: [null, null],
    modifiedRange: [null, null],
    // createdFrom: null,
    // createdTo: null,
    // modifiedFrom: null,
    // modifiedTo: null,
  },
  productDivisons,
  productOwners,
  productStatus,
}

export const recordsSlice = createSlice({
  name: 'records',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setRecordsList: (state) => {
      const uniqueList = records.map(r => ({ ...r, id: shortid.generate()}));
      state.list = uniqueList;
      state.filteredList = uniqueList.map(r => ({ ...r }));
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setFliteredList: (state, action: PayloadAction<recordType[]>) => {
      // debugger
      state.filteredList = action.payload;
    },
    setFliterSettings: (state, action: PayloadAction<filterSettingsType>) => {
      // debugger
      state.filterSettings = { ...state.filterSettings, ...action.payload };
    },
    onFilterRecords: (state) => {
      const filterKeys = Object.keys(state.filterSettings);
      // debugger
      let result = state.list.map(r => ({ ...r }));
      filterKeys.forEach((key) => {
        // debugger
        switch (key) {
          case 'searchKey':
            if (state.filterSettings[key] === '') break;
            result = result.filter(r => {
              const key = `${state.filterSettings.searchKey || ''}`;
              const test = r.title.toLowerCase().includes(key.toLowerCase());
              // debugger
              return test;
            });
            break;
          case 'division':
            if (state.filterSettings[key] === 'All') break;
            result = result.filter(r => {
              const test = r[key] === state.filterSettings[key];
              return test;
            });
            // debugger
            break;
          case 'project_owner':
            if (state.filterSettings[key] === 'All') break;
            result = result.filter(r => {
              const test = r[key] === state.filterSettings[key];
              return test;
            });
            // debugger
            break;
          case 'status':
            if (state.filterSettings[key] === 'All') break;
            result = result.filter(r => {
              const test = r[key] === state.filterSettings[key]?.toLowerCase();
              return test;
            });
            // debugger
            break;
          case 'budget':
            result = result.filter(r => {
              const test = r[key] >= Number(state.filterSettings[key]);
              return test;
            });
            // debugger
            break;
          case 'createdRange':
            if (state.filterSettings[key]?.[0] === null && state.filterSettings[key]?.[1] === null) break;
            if (state.filterSettings[key]?.[0] !== null) {
              result = result.filter(r => {
                // @ts-ignore: Object is possibly 'null'.
                const test = new Date(r.created) >= new Date(state.filterSettings.createdRange[0]);
                return test;
              });
              // debugger
            }
            if (state.filterSettings[key]?.[1] !== null) {
              result = result.filter(r => {
                // @ts-ignore: Object is possibly 'null'.
                const test = new Date(r.created) <= new Date(state.filterSettings.createdRange[1]);
                return test;
              });
              // debugger
            }
            // debugger
            break;
          case 'modifiedRange':
            if (state.filterSettings[key]?.[0] === null && state.filterSettings[key]?.[1] === null) break;
            if (state.filterSettings[key]?.[0] !== null) {
              result = result.filter(r => {
                // @ts-ignore: Object is possibly 'null'.
                const test = new Date(r.modified) >= new Date(state.filterSettings.modifiedRange[0]);
                return test;
              });
              // debugger
            }
            if (state.filterSettings[key]?.[1] !== null) {
              result = result.filter(r => {
                // @ts-ignore: Object is possibly 'null'.
                const test = new Date(r.modified) <= new Date(state.filterSettings.modifiedRange[1]);
                return test;
              });
              // debugger
            }
            // debugger
            break;
          default:
            // do nothing
        }
        // dispatch(setFliteredList(result));
        state.filteredList = result;
      });
    }
  },
})

export const { setRecordsList, setFliteredList, setFliterSettings, onFilterRecords } = recordsSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default recordsSlice.reducer