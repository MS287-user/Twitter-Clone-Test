import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Profile {
    id?: string;
    email?: string;
    username?: string;
}

const initialState: Profile = {
    id: '',
    email: '',
    username: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<Profile>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.username = action.payload.username;
        },
        clearUser: (state) => {
            state.id = '';
            state.email = '';
            state.username = '';
        }
    }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
