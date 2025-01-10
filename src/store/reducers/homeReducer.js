import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import apii from '../../api/apii'

export const get_products_by_category = createAsyncThunk(
  'product/get_products_by_category',
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
        }&pageNumber=${query.pageNumber ? query.pageNumber : '1'}&pageSize=${
          query.pageSize ? query.pageSize : '12'
        }`
      )
      return fulfillWithValue(data)
    } catch (error) {
      console.log(error)
    }
  }
)

export const homeReducer = createSlice({
  name: 'home',
  initialState: {
    productByCat: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = ''
      state.successMessage = ''
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      get_products_by_category.fulfilled,
      (state, { payload }) => {
        state.productByCat = payload.items
      }
    )
  },
})

export const { messageClear } = homeReducer.actions
export default homeReducer.reducer
