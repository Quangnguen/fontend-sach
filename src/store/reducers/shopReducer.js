import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apii from '../../api/apii'

export const query_products = createAsyncThunk(
  'product/query_products',
  async (query, { fulfillWithValue }) => {
    try {
      const { data } = await apii.get(
        `/Item/query?category=${
          query.category ? encodeURIComponent(query.category) : ''
        }&className=${
          query.className ? encodeURIComponent(query.className) : ''
        }&minPrice=${query.low ? query.low : ''}&maxPrice=${
          query.high ? query.high : ''
        }&sortPrice=${query.sortPrice ? query.sortPrice : ''}&name=${
          query.searchValue ? encodeURIComponent(query.searchValue) : ''
        }&type=${query.type ? encodeURIComponent(query.type) : ''}&author=${
          query.author ? encodeURIComponent(query.author) : ''
        }&pageNumber=${query.pageNumber ? query.pageNumber : '1'}&pageSize=12`
      )
      return fulfillWithValue(data)
    } catch (error) {
      console.log(error.response)
    }
  }
)

// End Method

export const product_details = createAsyncThunk(
  'product/product_details',
  async (slug, { fulfillWithValue }) => {
    try {
      const { data } = await apii.get(`/Item/${slug}`)
      //  console.log(data)
      return fulfillWithValue(data)
    } catch (error) {
      console.log(error.respone)
    }
  }
)

export const shopReducer = createSlice({
  name: 'shop',
  initialState: {
    categories: [],
    products: [],
    productByCat: [],
    latest_product: [],
    topRated_product: [],
    discount_product: [],
    product: {},
    relatedProducts: [],
    moreProduct: [],
    errorMessage: '',
    successMessage: '',
    totalReview: 0,
    rating_review: [],
    reviews: [],
    loading: false,
    error: null,
    price_range: {
      low: 0,
      high: 100,
    },
    totalProduct: 0,
    parPage: 3,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = ''
      state.successMessage = ''
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(query_products.fulfilled, (state, action) => {
        state.products = action.payload.items
        state.totalProduct = action.payload.totalCount
        state.parPage = action.payload.pageSize
        state.loading = false
      })

      .addCase(product_details.fulfilled, (state, { payload }) => {
        state.product = payload
      })
  },
})

export const { messageClear } = shopReducer.actions
export default shopReducer.reducer
