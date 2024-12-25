import { authReducer } from './reducers/authReducer'
import { cartReducer } from './reducers/cartReducer'
import { homeReducer } from './reducers/homeReducer'

const rootReducer = {
  home: homeReducer.reducer,
  auth: authReducer.reducer,
  cart: cartReducer.reducer,
}

export default rootReducer
