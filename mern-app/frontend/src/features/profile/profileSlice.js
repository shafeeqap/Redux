import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (userId) => {
    const response = await axios.get(`/api/profile/${userId}`);
    return response.data;
});

export const updateProfile = createAsyncThunk('profile/updateProfile', async ({ userId, profileData }) => {
    const formData = new FormData();
    formData.append('name', profileData.name);
    formData.append('phone', profileData.phone);
    if (profileData.profileImage) formData.append('profileImage', profileData.profileImage);

    const response = await axios.post(`/api/profile/${userId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
});

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: null,
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profile = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.profile = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default profileSlice.reducer;
