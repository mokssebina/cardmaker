import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const updateCredits = createAsyncThunk("updatecredits/updateCredits", async (updateData, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
            .from("profiles")
            .update({ credits: updateData?.credits })
            .eq('id', updateData?.id)
            .select()

        if (error) throw error;
        console.log("messages response: ", data)
        return data;
    } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch cards");
    }
}
);

const initialState = {
    updatedCredits: null,
    creditsLoading: false,
    creditsError: null,
}

const updateCreditsSlice = createSlice({
    name: "updatecredits",
    initialState,
    reducers: {
        resetUpdateCredits: (state, action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateCredits.pending, (state) => {
                state.creditsLoading = true;
            })
            .addCase(updateCredits.fulfilled, (state, action) => {
                state.creditsLoading = false;
                state.updatedCredits = action.payload;
            })
            .addCase(updateCredits.rejected, (state, action) => {
                state.creditsLoading = false;
                state.creditsError = action.error.message;
            })
    },
});

export const { resetUpdateCredits } = updateCreditsSlice.actions

export default updateCreditsSlice.reducer;

