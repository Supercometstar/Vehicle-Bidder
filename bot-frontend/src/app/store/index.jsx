import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'app/store/reducers/auth.reducer'
import notificationReducer from 'app/store/reducers/notification.reducer'
import bidReducer from 'app/store/reducers/bid.reducer'

const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    bid: bidReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
})
export default store