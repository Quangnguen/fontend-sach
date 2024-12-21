import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/api'

export const get_categories = createAsyncThunk(
  'product/get_categories',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/home/get-categories')
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// End Method
export const get_products = createAsyncThunk(
  'product/get_products',
  async (_, { fulfillWithValue }) => {
    try {
      const { data } = await api.get('/home/get-products')
      console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      console.log(error.respone)
    }
  }
)
// End Method

export const price_range_product = createAsyncThunk(
  'product/price_range_product',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get('/home/price-range-latest-product')
      return fulfillWithValue(data)
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const query_products = createAsyncThunk(
  'product/query_products',
  async (query, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/home/query-products?category=${query.category}&&rating=${
          query.rating
        }&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${
          query.sortPrice
        }&&pageNumber=${query.pageNumber}&&searchValue=${
          query.searchValue ? query.searchValue : ''
        } `
      )
      //  console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      console.log(error.respone)
    }
  }
)
// End Method

export const homeReducer = createSlice({
  name: 'home',
  initialState: {
    categories: [],
    products: [],
    latest_product: [],
    topRated_product: [],
    discount_product: [],
    loading: false,
    error: null,
    price_range: {
      low: 0,
      high: 100,
    },
    totalProduct: 0,
    parPage: 3,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(get_categories.pending, (state) => {
        state.loading = true
      })
      .addCase(get_categories.fulfilled, (state, { payload }) => {
        state.categories = payload.data.categories
        state.loading = false
      })
      .addCase(get_categories.rejected, (state, { payload }) => {
        // state.error = payload
        state.loading = false
      })

      .addCase(get_products.pending, (state) => {
        state.loading = true
      })
      .addCase(get_products.fulfilled, (state, { payload }) => {
        state.products = payload.data.products
        state.latest_product = payload.data.latest_product
        state.topRated_product = payload.data.topRated_product
        state.discount_product = payload.data.discount_product
        state.loading = false
      })
      .addCase(get_products.rejected, (state, { payload }) => {
        // state.error = payload
        state.loading = false
      })

      .addCase(price_range_product.fulfilled, (state, { payload }) => {
        state.latest_product = payload.data.latest_product
        state.price_range = payload.data.price_range
      })

      .addCase(query_products.fulfilled, (state, { payload }) => {
        state.products = payload.data.products
        state.totalProduct = payload.data.totalProduct
        state.parPage = payload.data.parPage
      })
  },
})

export default homeReducer.reducer
