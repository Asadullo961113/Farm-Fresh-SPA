import { configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import reduxLogger from "redux-logger"
import HomePageReducer from '../app/screens/homePage/slice';
import ProductPageReducer from './screens/productsPage/slice';
import OrdersPageReducer from './screens/ordersPage/slice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => 
    //@ts-ignore
    getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,
    productPage: ProductPageReducer,
    ordersPage: OrdersPageReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
