import { createSlice } from '@reduxjs/toolkit'

const initialState = { node: {} }

const nodeSlice = createSlice({
  name: 'node',
  initialState,
  reducers: {
    setNodeModal(state, action) {
      state.node = action.payload
    },
  },
})

export const { setNodeModal } = nodeSlice.actions
export default nodeSlice.reducer