import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const getMessagesCheck = createAsyncThunk("messagescheck/getMessagesCheck",async (id, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq('card_id', id);

      if (error) throw error;
      console.log("response: ",data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch cards");
    }
  }
);


const messagesCheckSlice = createSlice({
  name: "messagescheck",
  initialState: {
    messagesCheck: null,
    messagesCheckLoading: false,
    messagesCheckError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMessagesCheck.pending, (state) => {
        state.messagesCheckLoading = true;
        state.messagesCheckError = null;
      })
      .addCase(getMessagesCheck.fulfilled, (state, action) => {
        state.messagesCheckLoading = false;
        state.messagesCheck = action.payload;
      })
      .addCase(getMessagesCheck.rejected, (state, action) => {
        state.messagesCheckLoading = false;
        state.messagesCheckError = action.payload.message;
      })
  },
});

export default messagesCheckSlice.reducer;

