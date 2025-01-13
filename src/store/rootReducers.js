// rootReducers.js
import cartReducer from './reducers/cartReducer' // Không cần .reducer
import categoryReducer from './reducers/categoryReducer'
import homeReducer from './reducers/homeReducer'
import orderReducer from './reducers/orderReducer'
import shopReducer from './reducers/shopReducer'

const rootReducer = {
  home: homeReducer,
  cart: cartReducer, // Đã export default reducer từ cartReducer.js
  order: orderReducer,
  shop: shopReducer,
  category: categoryReducer
}

export default rootReducer
