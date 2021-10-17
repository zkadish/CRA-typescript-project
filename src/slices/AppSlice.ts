import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../store';

import {
  productDivisons,
  productOwners,
  productStatus,
} from '../mockData/app';

type appModalType = {
  open: boolean,
  type: string,
}

// Define a type for the slice state
interface RecordsState {
  appModal: appModalType,
  productDivisons: string[],
  productOwners: string[],
  productStatus: string[],
}

// Define the initial state using that type
const initialState: RecordsState = {
  appModal: {
    open: false,
    type: 'recordsFilter',
  },
  productDivisons,
  productOwners,
  productStatus,
}

export const appSlice = createSlice({
  name: 'app',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setAppModal: (state, action: PayloadAction<appModalType>) => {
      state.appModal = action.payload;
    },
  },
})

export const { setAppModal } = appSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default appSlice.reducer