import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    refreshFilter(state, action) {
      return action.payload
    }
  }
})

export default filterSlice.reducer
export const { refreshFilter } = filterSlice.actions