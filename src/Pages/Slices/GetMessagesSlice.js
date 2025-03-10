import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const getCardMessages = createAsyncThunk("getcardmessages/getCardMessages",async (id, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq('card_id', id);

      if (error) throw error;
      console.log("messages response: ",data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch cards");
    }
  }
);


const getCardMessagesSlice = createSlice({
  name: "getcardmessages",
  initialState: {
    cardMessages: null,
    cardMessagesLoading: false,
    getCardMessagesError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCardMessages.pending, (state) => {
        state.cardMessagesLoading = true;
        state.getCardMessagesError = null;
      })
      .addCase(getCardMessages.fulfilled, (state, action) => {
        state.cardMessagesLoading = false;
        state.cardMessages = action.payload;
      })
      .addCase(getCardMessages.rejected, (state, action) => {
        state.cardMessagesLoading = false;
        state.getCardMessagesError = action.error.message;
      })
  },
});

export default getCardMessagesSlice.reducer;

