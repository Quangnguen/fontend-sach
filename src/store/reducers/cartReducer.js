import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'
export const add_to_cart = createAsyncThunk(
  'cart/add_to_cart',
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post('/home/product/add-to-cart', info)
      console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
// End Method

export const get_cart_products = createAsyncThunk(
  'cart/get_cart_products',
  async (userId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/product/get-cart-product/${userId}`)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
// End Method

export const delete_cart_product = createAsyncThunk(
  'cart/delete_cart_product',
  async (cart_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/home/product/delete-cart-product/${cart_id}`
      )
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const quantity_inc = createAsyncThunk(
  'cart/quantity_inc',
  async (cart_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-inc/${cart_id}`)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const quantity_dec = createAsyncThunk(
  'card/quantity_dec',
  async (cart_id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(`/home/product/quantity-dec/${cart_id}`)
      // console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)
// End Method

export const cartReducer = createSlice({
  name: 'cart',
  initialState: {
    cart_products: [],
    cart_product_count: 0,
    wishlist_count: 0,
    wishlist: [],
    price: 0,
    errorMessage: '',
    successMessage: '',
    shipping_fee: 0,
    outofstock_products: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = ''
      state.successMessage = ''
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(add_to_cart.rejected, (state, { payload }) => {
        state.errorMessage = payload.error
      })
      .addCase(add_to_cart.fulfilled, (state, { payload }) => {
        state.successMessage = payload.data.message
        state.cart_product_count = state.cart_product_count + 1
      })

      .addCase(get_cart_products.fulfilled, (state, { payload }) => {
        state.cart_products = payload.data.cart_products
        state.price = payload.data.price
        state.cart_product_count = payload.data.cart_product_count
        state.shipping_fee = payload.data.shipping_fee
        state.outofstock_products = payload.data.outOfStockProduct
        state.buy_product_item = payload.data.buy_product_item
      })

      .addCase(delete_cart_product.fulfilled, (state, { payload }) => {
        state.cart_product_count = state.cart_product_count - 1
        state.successMessage = payload.data.message
      })

      .addCase(quantity_inc.fulfilled, (state, { payload }) => {
        state.successMessage = payload.data.message
      })

      .addCase(quantity_dec.fulfilled, (state, { payload }) => {
        state.successMessage = payload.data.message
      })
  },
})
export const { messageClear } = cartReducer.actions
export default cartReducer.reducer
