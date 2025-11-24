import { User, UserData } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [] as User[]
    },
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        updateUser: (state, action: PayloadAction<UserData>) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = { ...state.users[index], ...action.payload };
            }
        }
    }
});

export const { setUsers, deleteUser, updateUser } = usersSlice.actions;
export default usersSlice.reducer;