import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const createCard = createAsyncThunk("createcard/createCard",async (card, { rejectWithValue }) => {
    try {

      const { data, error } = await supabase
      .from("cards")
      .insert({
        creator_id: card.userId,
        card_id: card.postId,
        paid: card.type,
        card_data: {
          "image": "",
          "template": "default",
          "cardName": `${card.cardName}`,
          "cardTitle": `${card.cardTitle}`,
          "lightTheme": "#ffffff",
          "darkTheme": "#030712",
          "titleFont": "Pacifico, cursive",
          "introText": "Start message here...",
          "coverImage": null,
          "lightText": "#ffffff",
          "darkText": "#030712",
          "birthdayMessage": "Finish message here",
          "messages": null,
          "layout": "default",
          "switch": true
        },
        created_at: new Date()
      })
      .eq('creator_id', card.userId)
      .select()

      if (error) throw error;
      console.log("response: ",data)
      return data;
      
    } catch (error) {
      return rejectWithValue(error.message || "Failed to submit message");
    }
  }
);

const initialState = {
    createCardData: null,
    createCardLoading: false,
    createCardError: null,
  }

const createCardSlice = createSlice({
  name: "createcard",
  initialState,
  reducers: {
    resetCreateCard: (state, action) => {
        return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCard.pending, (state) => {
        state.createCardLoading = true;
        state.createCardError = null;
      })
      .addCase(createCard.fulfilled, (state, action) => {
        state.createCardLoading = false;
        state.createCardData = action.payload;
      })
      .addCase(createCard.rejected, (state, action) => {
        state.createCardLoading = false;
        state.createCardError = action.error.message;
      })
  },
});

export const { resetCreateCard } = createCardSlice.actions

export default createCardSlice.reducer;

