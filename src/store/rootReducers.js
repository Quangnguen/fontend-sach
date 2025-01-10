// rootReducers.js
import authReducer from './reducers/authReducer'
import cartReducer from './reducers/cartReducer' // Không cần .reducer
import categoryReducer from './reducers/categoryReducer'
import dashboardReducer from './reducers/dashboardReducer'
import homeReducer from './reducers/homeReducer'
import orderReducer from './reducers/orderReducer'
import shopReducer from './reducers/shopReducer'

const rootReducer = {
  home: homeReducer,
  auth: authReducer,
  cart: cartReducer, // Đã export default reducer từ cartReducer.js
  order: orderReducer,
  dashboard: dashboardReducer,
  shop: shopReducer,
  category: categoryReducer
}

export default rootReducer
