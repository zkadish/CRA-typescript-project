import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../store';
import { DateRange } from '@mui/lab/DateRangePicker';
import {
  records,
  productDivisons,
  productOwners,
  productStatus,
} from '../mockData/records';

const shortid = require('shortid');

type recordType = {
  id: string,
  title: string,
  division: string,
  project_owner: string,
  budget: number,
  status: string,
  created: string,
  modified: null | string,
}

type projectOwnerType = {
  id: string | undefined,
  project_owner: string | unknown,
}

type projectBudgetType = {
  id: string | undefined,
  budget: number | unknown,
}

type projectStatusType = {
  id: string | undefined,
  status: string | unknown,
}

type filterSettingsType = {
  searchKey: string,
  division: string,
  project_owner: string,
  budget: number,
  status: string,
  createdRange: DateRange<Date | null>,
  modifiedRange: DateRange<Date | null>,
}

// Define a type for the slice state
interface RecordsState {
  list: Array<recordType>,
  filteredList: Array<recordType>,
  filterSettings: filterSettingsType,
  productDivisons: string[],
  productOwners: string[],
  productStatus: string[],
}

// Define the initial state using that type
const initialState: RecordsState = {
  list: [],
  filteredList: [],
  filterSettings: {
    searchKey: '',
    division: 'All',
    project_owner: 'All',
    budget: 0,
    status: 'All',
    createdRange: [null, null],
    modifiedRange: [null, null],
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
      state.filteredList = action.payload;
    },
    setFliterSettings: (state, action: PayloadAction<filterSettingsType>) => {
      state.filterSettings = { ...state.filterSettings, ...action.payload };
    },
    onFilterRecords: (state) => {
      const filterKeys = Object.keys(state.filterSettings);
      let result = state.list.map(r => ({ ...r }));
      filterKeys.forEach((key) => {
        switch (key) {
          case 'searchKey':
            if (state.filterSettings[key] === '') break;
            result = result.filter(r => {
              const key = `${state.filterSettings.searchKey || ''}`;
              const test = r.title.toLowerCase().includes(key.toLowerCase());
              return test;
            });
            break;
          case 'division':
            if (state.filterSettings[key] === 'All') break;
            result = result.filter(r => {
              const test = r[key] === state.filterSettings[key];
              return test;
            });
            break;
          case 'project_owner':
            if (state.filterSettings[key] === 'All') break;
            result = result.filter(r => {
              const test = r[key] === state.filterSettings[key];
              return test;
            });
            break;
          case 'status':
            if (state.filterSettings[key] === 'All') break;
            result = result.filter(r => {
              const test = r[key] === state.filterSettings[key]?.toLowerCase();
              return test;
            });
            break;
          case 'budget':
            result = result.filter(r => {
              const test = r[key] >= Number(state.filterSettings[key]);
              return test;
            });
            break;
          case 'createdRange':
            if (state.filterSettings[key]?.[0] === null && state.filterSettings[key]?.[1] === null) break;
            if (state.filterSettings[key]?.[0] !== null) {
              result = result.filter(r => {
                // @ts-ignore: Object is possibly 'null'.
                const test = new Date(r.created) >= new Date(state.filterSettings.createdRange[0]);
                return test;
              });
            }
            if (state.filterSettings[key]?.[1] !== null) {
              result = result.filter(r => {
                // TODO: fix this TS error
                // @ts-ignore: Object is possibly 'null'.
                const test = new Date(r.created) <= new Date(state.filterSettings.createdRange[1]);
                return test;
              });
            }
            break;
          case 'modifiedRange':
            if (state.filterSettings[key]?.[0] === null && state.filterSettings[key]?.[1] === null) break;
            if (state.filterSettings[key]?.[0] !== null) {
              result = result.filter(r => {
                // @ts-ignore: Object is possibly 'null'.
                const test = new Date(r.modified) >= new Date(state.filterSettings.modifiedRange[0]);
                return test;
              });
            }
            if (state.filterSettings[key]?.[1] !== null) {
              result = result.filter(r => {
                // @ts-ignore: Object is possibly 'null'.
                const test = new Date(r.modified) <= new Date(state.filterSettings.modifiedRange[1]);
                return test;
              });
            }
            break;
          default:
            // do nothing
        }
        state.filteredList = result;
      });
    },
    setProjectOwner: (state, action: PayloadAction<projectOwnerType>) => {
      const list = state.list.map(l => ({ ...l }));
      const record = list.find(l => l.id === action.payload.id);
      record!.project_owner = `${action.payload!.project_owner}`;
      state.list = list;

      const filteredList = state.filteredList.map(l => ({ ...l }));
      const filteredRecord = filteredList.find(l => l.id === action.payload.id);
      filteredRecord!.project_owner = `${action.payload!.project_owner}`;
      state.filteredList = filteredList;
    },
    setProjectBudget: (state, action: PayloadAction<projectBudgetType>) => {
      const list = state.list.map(l => ({ ...l }));
      const record = list.find(l => l.id === action.payload.id);
      record!.budget = Number(action.payload!.budget);
      state.list = list;

      const filteredList = state.filteredList.map(l => ({ ...l }));
      const filteredRecord = filteredList.find(l => l.id === action.payload.id);
      filteredRecord!.budget = Number(action.payload!.budget);
      state.filteredList = filteredList;
    },
    setProjectStatus: (state, action: PayloadAction<projectStatusType>) => {
      const list = state.list.map(l => ({ ...l }));
      const record = list.find(l => l.id === action.payload.id);
      record!.status = `${action.payload!.status}`;
      state.list = list;

      const filteredList = state.filteredList.map(l => ({ ...l }));
      const filteredRecord = filteredList.find(l => l.id === action.payload.id);
      filteredRecord!.status = `${action.payload!.status}`;
      state.filteredList = filteredList;
    },
  },
})

export const {
  setRecordsList,
  setFliteredList,
  setFliterSettings,
  onFilterRecords,
  setProjectOwner,
  setProjectBudget,
  setProjectStatus,
} = recordsSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default recordsSlice.reducer