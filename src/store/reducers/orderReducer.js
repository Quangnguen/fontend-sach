import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'
export const place_order = createAsyncThunk(
  'order/place_order',
  async (
    { price, products, shipping_fee, items, shippingInfo, userId },
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const { data } = await api.post('/home/order/place-order', {
        price,
        products,
        shipping_fee,
        items,
        shippingInfo,
        userId,
      })

      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
// End Method
export const get_orders = createAsyncThunk(
  'order/get_orders',
  async ({ customerId, status }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-orders/${customerId}/${status}`
      )
      // console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
// End Method

export const get_order_details = createAsyncThunk(
  'order/get_order_details',
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/customer/get-order-details/${orderId}`
      )
      // console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
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
        state.successMessage = payload.data.message
        state.orderId = payload.data.orderId
      })

      .addCase(get_orders.fulfilled, (state, { payload }) => {
        state.myOrders = payload.data.orders
      })

      .addCase(get_order_details.fulfilled, (state, { payload }) => {
        state.myOrder = payload.data.order
      })
  },
})
export const { messageClear } = orderReducer.actions
export default orderReducer.reducer
