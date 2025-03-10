import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const updateCardMessage = createAsyncThunk("updatemessage/updateCardMessage", async (messageData, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
            .from("messages")
            .update({ message: messageData?.message })
            .eq('message_id', messageData?.id)
            .select()

        if (error) throw error;
        console.log("messages response: ", data)
        return data;
    } catch (error) {
        return rejectWithValue(error.message || "Failed to fetch cards");
    }
}
);


const updateCardMessageSlice = createSlice({
    name: "updatemessage",
    initialState: {
        updatedMessage: null,
        updatedMessageLoading: false,
        updatedMessageError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateCardMessage.pending, (state) => {
                state.updatedMessageLoading = true;
                state.updatedMessageError = null;
            })
            .addCase(updateCardMessage.fulfilled, (state, action) => {
                state.updatedMessageLoading = false;
                state.updatedMessage = action.payload;
            })
            .addCase(updateCardMessage.rejected, (state, action) => {
                state.updatedMessageLoading = false;
                state.updatedMessageError = action.error.message;
            })
    },
});

export default updateCardMessageSlice.reducer;

