import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const loadCard = createAsyncThunk("loadcard/loadCard", async (id, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
            .from('cards')
            .select()
            .eq('card_id', id)

        if (error) throw error;
        console.log("response: ", data)
        return data;
    } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch cards");
    }
}
);


const loadCardSlice = createSlice({
    name: "loadcard",
    initialState: {
        cardData: null,
        cardDataLoading: false,
        getCardDataError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCard.pending, (state) => {
                state.cardDataLoading = true;
                state.getCardDataError = null;
            })
            .addCase(loadCard.fulfilled, (state, action) => {
                state.cardDataLoading = false;
                state.cardData = action.payload;
            })
            .addCase(loadCard.rejected, (state, action) => {
                state.cardDataLoading = false;
                state.getCardDataError = action.payload.message;
            })
    },
});

export default loadCardSlice.reducer;

