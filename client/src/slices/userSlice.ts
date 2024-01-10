import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: { token: null } };

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        authorize: (state, action) => { state.value = action.payload; },
        unauthorize: (state, action) => { state.value = initialState.value; } // Resets the state to the initial state

    }
});

export const { authorize, unauthorize } = userSlice.actions;