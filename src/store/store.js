import { configureStore } from '@reduxjs/toolkit'
import SignInSlice from '../AuthPages/SigninSlice.js/signInSlice';
import VerifyOtpSlice from '../AuthPages/SigninSlice.js/verifyOtpSlice';
import fetchCards from '../Pages/Slices/GetCardsSlice';
import SubmitMessageSlice from '../Pages/Slices/SubmitMessageSlice';
import LoadCardSlice from '../Pages/Slices/LoadCardSlice';
import ImageUploadSlice from '../Pages/Slices/ImageUploadSlice';
import GetMessagesSlice from '../Pages/Slices/GetMessagesSlice';
import CheckMessagesSlice from '../Pages/Slices/CheckMessagesSlice';
import UpdateMessageSlice from '../Pages/Slices/UpdateMessageSlice';
import DeleteMessageSlice from '../Pages/Slices/DeleteMessageSlice';
import GetUserProfile from '../Pages/Slices/GetUserProfile';
import UpdateCredits from '../Pages/Slices/UpdateCredits';
import UpdatePurchases from '../Pages/Slices/UpdatePurchases';
import ProfileUpdate from '../AuthPages/SignupSlice/profileUpdate';
import UpdateCard from '../Pages/Slices/UpdateCard';
import CreateCard from '../Pages/Slices/CreateCard';
import GetPurchasesSlice from '../Pages/Slices/GetPurchasesSlice';



export const store = configureStore({
  reducer: {
    signin: SignInSlice,
    getcards: fetchCards,
    submitmessage: SubmitMessageSlice,
    loadcard: LoadCardSlice,
    cardimage: ImageUploadSlice,
    getcardmessages: GetMessagesSlice,
    messagescheck: CheckMessagesSlice,
    updatemessage: UpdateMessageSlice,
    deletemessage: DeleteMessageSlice,
    getuserprofile: GetUserProfile,
    updatecredits: UpdateCredits,
    updatepurchases: UpdatePurchases,
    verifyuserotp: VerifyOtpSlice,
    updateprofile: ProfileUpdate,
    updatecard: UpdateCard,
    createcard: CreateCard,
    getpurchases: GetPurchasesSlice
  },
})