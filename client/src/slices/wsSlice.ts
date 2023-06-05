import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: { webSocket: null } };

export const wsSlice = createSlice({
    name: 'webSocket',
    initialState: initialState,
    reducers: {
        setWS: (state, action) => { state.value = action.payload },
    }
});

export const { setWS } = wsSlice.actions;