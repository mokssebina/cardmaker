import { configureStore } from '@reduxjs/toolkit'
import fetchCards from '../Pages/Slices/GetCardsSlice';
import SubmitMessageSlice from '../Pages/Slices/SubmitMessageSlice';
import LoadCardSlice from '../Pages/Slices/LoadCardSlice';
import GetMessagesSlice from '../Pages/Slices/GetMessagesSlice';
import CheckMessagesSlice from '../Pages/Slices/CheckMessagesSlice';
import UpdateMessageSlice from '../Pages/Slices/UpdateMessageSlice';
import DeleteMessageSlice from '../Pages/Slices/DeleteMessageSlice';
import GetUserProfile from '../Pages/Slices/GetUserProfile';


export const store = configureStore({
  reducer: {
    getcards: fetchCards,
    submitmessage: SubmitMessageSlice,
    loadcard: LoadCardSlice,
    getcardmessages: GetMessagesSlice,
    messagescheck: CheckMessagesSlice,
    updatemessage: UpdateMessageSlice,
    deletemessage: DeleteMessageSlice,
    getuserprofile: GetUserProfile
  },
})