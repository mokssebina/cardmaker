import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const uploadCardImage = createAsyncThunk("cardimage/loadCard", async (imageData, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase.storage
            .from('cardimages')
            .upload(imageData.filePath, imageData.file);
        if (error) throw error;
        console.log("response: ", data)
        return data;
    } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch cards");
    }
});

const uploadCardImageSlice = createSlice({
    name: "cardimage",
    initialState: {
        imageData: null,
        imageLoading: false,
        imageDataError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadCardImage.pending, (state) => {
                state.imageLoading = true;
            })
            .addCase(uploadCardImage.fulfilled, (state, action) => {
                state.imageLoading = false;
                state.imageData = action.payload;
            })
            .addCase(uploadCardImage.rejected, (state, action) => {
                state.cardDataLoading = false;
                state.imageDataError = action.error.message;
            })
    },
});

export default uploadCardImageSlice.reducer;