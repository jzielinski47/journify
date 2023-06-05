import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = { value: { id: 0 } };

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        authorize: (state, action) => {
            state.value = action.payload;
        },
        unauthorize: (state, action) => {
            return initialState;
        }
    }
});

export const { authorize, unauthorize } = userSlice.actions;

export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
});
