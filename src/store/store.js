import { configureStore } from '@reduxjs/toolkit'
import fetchCards from '../Pages/Slices/GetCardsSlice';
import SubmitMessageSlice from '../Components/ScreenElements/MessagePage/Messages/SubmitMessageSlice';



export const store = configureStore({
  reducer: {
    getcards: fetchCards,
    submitmessage: SubmitMessageSlice
  },
})