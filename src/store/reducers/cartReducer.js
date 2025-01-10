// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import api from '../../api/api'
// export const add_to_cart = createAsyncThunk(
//   'cart/add_to_cart',
//   async (info, { rejectWithValue, fulfillWithValue }) => {
//     try {
//       const { data } = await api.post('/home/product/add-to-cart', info)
//       console.log(data)
//       return fulfillWithValue(data)
//     } catch (error) {
//       return rejectWithValue(error.response.data)
//     }
//   }
// )
// // End Method

import { createSlice } from "@reduxjs/toolkit";

// export const get_cart_products = createAsyncThunk(
//   'cart/get_cart_products',
//   async (userId, { rejectWithValue, fulfillWithValue }) => {
//     try {
//       const { data } = await api.get(`/home/product/get-cart-product/${userId}`)
//       return fulfillWithValue(data)
//     } catch (error) {
//       return rejectWithValue(error.response.data)
//     }
//   }
// )
// // End Method

// export const delete_cart_product = createAsyncThunk(
//   'cart/delete_cart_product',
//   async (cart_id, { rejectWithValue, fulfillWithValue }) => {
//     try {
//       const { data } = await api.delete(
//         `/home/product/delete-cart-product/${cart_id}`
//       )
//       return fulfillWithValue(data)
//     } catch (error) {
//       return rejectWithValue(error.response.data)
//     }
//   }
// )

// export const quantity_inc = createAsyncThunk(
//   'cart/quantity_inc',
//   async (cart_id, { rejectWithValue, fulfillWithValue }) => {
//     try {
//       const { data } = await api.put(`/home/product/quantity-inc/${cart_id}`)
//       return fulfillWithValue(data)
//     } catch (error) {
//       return rejectWithValue(error.response.data)
//     }
//   }
// )

// export const quantity_dec = createAsyncThunk(
//   'cart/quantity_dec',
//   async (cart_id, { rejectWithValue, fulfillWithValue }) => {
//     try {
//       const { data } = await api.put(`/home/product/quantity-dec/${cart_id}`)
//       // console.log(data)
//       return fulfillWithValue(data)
//     } catch (error) {
//       return rejectWithValue(error.response.data)
//     }
//   }
// )
// // End Method

// export const add_to_wishlist = createAsyncThunk(
//   'wishlist/add_to_wishlist',
//   async (info, { rejectWithValue, fulfillWithValue }) => {
//     try {
//       const { data } = await api.post('/home/product/add-to-wishlist', info)
//       // console.log(data)
//       return fulfillWithValue(data)
//     } catch (error) {
//       return rejectWithValue(error.response.data)
//     }
//   }
// )
// // End Method

// export const get_wishlist_products = createAsyncThunk(
//   'wishlist/get_wishlist_products',
//   async (userId, { rejectWithValue, fulfillWithValue }) => {
//     try {
//       const { data } = await api.get(
//         `/home/product/get-wishlist-products/${userId}`
//       )
//       // console.log(data)
//       return fulfillWithValue(data)
//     } catch (error) {
//       return rejectWithValue(error.response.data)
//     }
//   }
// )
// // End Method

// export const remove_wishlist = createAsyncThunk(
//   'wishlist/remove_wishlist',
//   async (wishlistId, { rejectWithValue, fulfillWithValue }) => {
//     try {
//       const { data } = await api.delete(
//         `/home/product/remove-wishlist-product/${wishlistId}`
//       )
//       // console.log(data)
//       return fulfillWithValue(data)
//     } catch (error) {
//       return rejectWithValue(error.response.data)
//     }
//   }
// )
// // End Method

// export const cartReducer = createSlice({
//   name: 'cart',
//   initialState: {
//     cart_products: [],
//     cart_product_count: 0,
//     wishlist_count: 0,
//     wishlist: [],
//     price: 0,
//     errorMessage: '',
//     successMessage: '',
//     shipping_fee: 0,
//     outofstock_products: [],
//   },
//   reducers: {
//     messageClear: (state, _) => {
//       state.errorMessage = ''
//       state.successMessage = ''
//     },
//     reset_count: (state, _) => {
//       state.cart_product_count = 0
//       state.wishlist_count = 0
//     },
//   },
//   extraReducers: (builder) => {
//     builder

//       .addCase(add_to_cart.rejected, (state, { payload }) => {
//         state.errorMessage = payload.error
//       })
//       .addCase(add_to_cart.fulfilled, (state, { payload }) => {
//         state.successMessage = payload.data.message
//         state.cart_product_count = state.cart_product_count + 1
//       })

//       .addCase(get_cart_products.fulfilled, (state, { payload }) => {
//         state.cart_products = payload.data.cart_products
//         state.price = payload.data.price
//         state.cart_product_count = payload.data.cart_product_count
//         state.shipping_fee = payload.data.shipping_fee
//         state.outofstock_products = payload.data.outOfStockProduct
//         state.buy_product_item = payload.data.buy_product_item
//       })

//       .addCase(delete_cart_product.fulfilled, (state, { payload }) => {
//         state.cart_product_count = state.cart_product_count - 1
//         state.successMessage = payload.data.message
//       })

//       .addCase(quantity_inc.fulfilled, (state, { payload }) => {
//         state.successMessage = payload.data.message
//       })

//       .addCase(quantity_dec.fulfilled, (state, { payload }) => {
//         state.successMessage = payload.data.message
//       })

//       .addCase(add_to_wishlist.rejected, (state, { payload }) => {
//         state.errorMessage = payload.error
//       })
//       .addCase(add_to_wishlist.fulfilled, (state, { payload }) => {
//         state.successMessage = payload.data.message
//         state.wishlist_count =
//           state.wishlist_count > 0 ? state.wishlist_count + 1 : 1
//       })

//       .addCase(get_wishlist_products.fulfilled, (state, { payload }) => {
//         state.wishlist = payload.data.wishlists
//         state.wishlist_count = payload.data.wishlistCount
//       })

//       .addCase(remove_wishlist.fulfilled, (state, { payload }) => {
//         state.successMessage = payload.data.message
//         state.wishlist = state.wishlist.filter(
//           (p) => p._id !== payload.data.wishlistId
//         )
//         state.wishlist_count = state.wishlist_count - 1
//       })
//   },
// })
// export const { messageClear, reset_count } = cartReducer.actions
// export default cartReducer.reducer


// Khởi tạo state ban đầu

const initialState = JSON.parse(localStorage.getItem('cart')) || []

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.find(
        (item) => item.id === action.payload.id
      )

      if (existingProduct) {
        // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
        existingProduct.quantity += action.payload.quantity
      } else {
        // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
        state.push(action.payload)
      }
    },
    updateCart: (state, action) => {
      return action.payload
    },
    deleteProduct: (state, action) => {
      return state.filter((item) => item.id !== action.payload)
    },
    updateQuantity: (state, action) => {
      const productIndex = state.findIndex(
        (item) => item.id === action.payload.id
      )
      if (productIndex !== -1) {
        state[productIndex].quantity = action.payload.quantity
      }
    },
   
  },
})

// Export actions
export const { addProduct, updateCart, deleteProduct, updateQuantity } =
  cartSlice.actions

// Export reducer mặc định
export default cartSlice.reducer