import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const fetchCards = createAsyncThunk("getcards/fetchCards",async (id, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
      .from("cards")
      .select("*")
      .eq('creator_id', id);

      if (error) throw error;
      console.log("response: ",data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch cards");
    }
  }
);


const cardsSlice = createSlice({
  name: "getcards",
  initialState: {
    cards: null,
    cardsLoading: false,
    getCardsError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.cardsLoading = true;
        state.getCardsError = null;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cardsLoading = false;
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.cardsLoading = false;
        state.getCardsError = action.payload.message;
      })
  },
});

export default cardsSlice.reducer;

