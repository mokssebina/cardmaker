import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../../supabase/supabaseClient'


export const signInUser = createAsyncThunk('signin/signInUser', async (email) => {
    const reseponse = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: 'http://localhost:3000/cards',
        },
    })

    return reseponse
})

const initialState = {
    signinLoader: false,
    signinMessage: '',
    signinErrorMessage: '',
    signinStatusCode: null
}

const signInUserSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        resetSigninUser: (state, action) => {
            return initialState
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signInUser.pending, (state, action) => {
            state.signinLoader = true
        })
        builder.addCase(signInUser.fulfilled, (state, action) => {
            state.signinLoader = false
            state.signinMessage = 'A message has been sent to your email.'
        })
        builder.addCase(signInUser.rejected, (state, action) => {
            state.signinLoader = false
            state.signinErrorMessage = action.error.message
        })
    }
})

export const { resetSigninUser } = signInUserSlice.actions

export default signInUserSlice.reducer