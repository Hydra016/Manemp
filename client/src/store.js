import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import shopReducer from "./features/shopSlice";
import commonReducer from "./features/commonSlice";
import requestsReducer from "./features/requestsSlice";
import shiftReducer from "./features/shiftSlice";
import scheduleSlice from "./features/scheduleSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    common: commonReducer,
    request: requestsReducer,
    shifts: shiftReducer,
    schedule: scheduleSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
