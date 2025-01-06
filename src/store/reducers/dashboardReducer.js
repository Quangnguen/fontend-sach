import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'
export const get_dashboard_index_data = createAsyncThunk(
  'dashboard/get_dashboard_index_data',
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-dashboard-data/${userId}`
      )
      console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
// End Method

export const dashboardReducer = createSlice({
  name: 'dashboard',
  initialState: {
    recentOrders: [],
    errorMessage: '',
    successMessage: '',
    totalOrder: 0,
    pendingOrder: 0,
    cancelledOrder: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = ''
      state.successMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      get_dashboard_index_data.fulfilled,
      (state, { payload }) => {
        state.totalOrder = payload.data.otalOrder
        state.pendingOrder = payload.data.pendingOrder
        state.cancelledOrder = payload.data.cancelledOrder
        state.recentOrders = payload.data.recentOrders
      }
    )
  },
})
export const { messageClear } = dashboardReducer.actions
export default dashboardReducer.reducer
