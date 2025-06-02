import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const updateCard = createAsyncThunk("updatecard/updateCard", async (card, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
            .from("cards")
            .update({
                card_data: {
                    image: card.image,
                    template: card.template,
                    cardName: card.cardName,
                    cardTitle: card.cardTitle,
                    lightTheme: card.lightTheme,
                    darkTheme: card.darkTheme,
                    titleFont: card.titleFont,
                    introText: card.introText,
                    coverImage: card.coverImage,
                    lightText: card.lightText,
                    darkText: card.darkText,
                    birthdayMessage: card.birthdayMessage,
                    messages: card.messages,
                    layout: card.layout,
                    switch: card.switch
                }
            })
            .eq('card_id', card?.id)
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
    updatedCardData: null,
    updatedCardLoading: false,
    updatedCardError: null,
}

const updateCardSlice = createSlice({
    name: "updatecard",
    initialState,
    reducers: {
        resetUpdateCard: (state, action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateCard.pending, (state) => {
                state.updatedCardLoading = true;
            })
            .addCase(updateCard.fulfilled, (state, action) => {
                state.creditsLoading = false;
                state.updatedCardData = action.payload;
            })
            .addCase(updateCard.rejected, (state, action) => {
                state.updatedCardLoading = false;
                state.updatedCardError = action.error.message;
            })
    },
});

export const {resetUpdateCard} = updateCardSlice.actions

export default updateCardSlice.reducer;

