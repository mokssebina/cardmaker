import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabase/supabaseClient";


export const deleteCardMessage = createAsyncThunk("deletemessage/deleteCardMessage", async (item, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase
            .from("messages")
            .delete()
            .eq('message_id', item)
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
    deletedMessage: null,
    deletedMessageLoading: false,
    deletedMessageError: null,
}

const deleteCardMessageSlice = createSlice({
    name: "deletemessage",
    initialState,
    reducers: {
        resetDeleteCardMessage: (state,action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteCardMessage.pending, (state) => {
                state.deletedMessageLoading = true;
                state.deletedMessageError = null;
            })
            .addCase(deleteCardMessage.fulfilled, (state, action) => {
                state.deletedMessageLoading = false;
                state.deletedMessage = action.payload;
            })
            .addCase(deleteCardMessage.rejected, (state, action) => {
                state.deletedMessageLoading = false;
                state.deletedMessageError = action.error.message;
            })
    },
});

export const { resetDeleteCardMessage } = deleteCardMessageSlice.actions

export default deleteCardMessageSlice.reducer;

