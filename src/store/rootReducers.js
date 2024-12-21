import { authReducer } from './reducers/authReducer'
import { homeReducer } from './reducers/homeReducer'

const rootReducer = {
  home: homeReducer.reducer,
  auth: authReducer.reducer,
}

export default rootReducer
