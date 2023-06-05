import { configureStore, createSlice } from '@reduxjs/toolkit';

import { userSlice } from './slices/userSlice';
import { wsSlice } from './slices/wsSlice';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        ws: wsSlice.reducer
    }
});
