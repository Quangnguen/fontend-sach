import { authReducer } from './reducers/authReducer'
import { cartReducer } from './reducers/cartReducer'
import { chatReducer } from './reducers/chatReducer'
import { dashboardReducer } from './reducers/dashboardReducer'
import { homeReducer } from './reducers/homeReducer'
import { orderReducer } from './reducers/orderReducer'

const rootReducer = {
  home: homeReducer.reducer,
  auth: authReducer.reducer,
  cart: cartReducer.reducer,
  order: orderReducer.reducer,
  dashboard: dashboardReducer.reducer,
  chat: chatReducer.reducer,
}

export default rootReducer
