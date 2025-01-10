import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apii from '../../api/apii'
export const place_order = createAsyncThunk(
  'order/place_order',
  async (query, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await apii.post(`/Email`, query.body, {
        params: {
          rcv: query.rcv,
          subject: query.subject,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return fulfillWithValue(data)
    } catch (error) {
      console.error(
        'Error placing order:',
        error.response?.data || error.message
      )
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

// End Method

export const orderReducer = createSlice({
  name: 'order',
  initialState: {
    myOrders: [],
    errorMessage: '',
    successMessage: '',
    myOrder: {},
    orderId: '',
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = ''
      state.successMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(place_order.fulfilled, (state, { payload }) => {
        state.successMessage = "Đặt hàng thành công"
      })

      .addCase(place_order.rejected, (state, { payload }) => {
        state.errorMessage = payload.error
      })
  },
})
export const { messageClear } = orderReducer.actions
export default orderReducer.reducer
