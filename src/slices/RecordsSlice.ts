import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

import {
  records,
  productOwners,
  productStatus,
} from '../mockData/records';

type recordType = {
  title: string,
  division: string,
  project_owner: string,
  budget: number,
  status: string,
  created: string,
  modified: null | string,
}

// Define a type for the slice state
interface RecordsState {
  list: recordType[],
  filteredList: recordType[],
  productOwners: string[],
  productStatus: string[],
}

// Define the initial state using that type
const initialState: RecordsState = {
  list: records,
  filteredList: records,
  productOwners,
  productStatus,
}

export const recordsSlice = createSlice({
  name: 'records',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setFliteredList: (state, action: PayloadAction<[]>) => {
      state.filteredList = action.payload;
    },
  },
})

export const { setFliteredList } = recordsSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default recordsSlice.reducer