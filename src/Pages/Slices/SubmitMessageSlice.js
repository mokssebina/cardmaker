import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const submitMessage = createAsyncThunk("submitmessage/submitMessage",async (messageData, { rejectWithValue }) => {
    try {

      const { data, error } = await supabase
      .from("messages")
      .insert(messageData)
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
  submitMessageResponse: null,
  submitMessageLoading: false,
  submitMessageError: null,
}

const submitMessageSlice = createSlice({
  name: "submitmessage",
  initialState,
  reducers: {
    resetSubmitMessage: (state, action) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitMessage.pending, (state) => {
        state.submitMessageLoading = true;
        state.submitMessageError = null;
      })
      .addCase(submitMessage.fulfilled, (state, action) => {
        state.submitMessageLoading = false;
        state.submitMessageResponse = action.payload;
      })
      .addCase(submitMessage.rejected, (state, action) => {
        state.submitMessageLoading = false;
        state.submitMessageError = action.error.message;
      })
  },
});

export const { resetSubmitMessage } = submitMessageSlice.actions

export default submitMessageSlice.reducer;

