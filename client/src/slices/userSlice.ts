import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: { token: null } };

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        authorize: (state, action) => { state.value = action.payload },
        unauthorize: (state, action) => initialState
    }
});

export const { authorize, unauthorize } = userSlice.actions;