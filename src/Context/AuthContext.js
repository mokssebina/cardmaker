import React, { createContext, useContext, useEffect, useState } from "react";

//////////////---Formik imports---////////////////////
import { useDispatch, useSelector } from 'react-redux';

//////////////---Navigation imports---////////////////////
import { useNavigate } from "react-router-dom";

//////////////---Supabase imports---////////////////////
import { supabase } from "../supabase/supabaseClient";
import { Session, User } from '@supabase/supabase-js';

//////////////---Toast imports---////////////////////
import { toast } from 'react-hot-toast'

//////////////---Nanoid imports---////////////////////
import { nanoid } from "nanoid";

//////////////---Paddlen imports---////////////////////
import { initializePaddle, Paddle } from '@paddle/paddle-js';

//////////////---API imports---////////////////////
import { getUserProfile } from "../Pages/Slices/GetUserProfile";



const AuthContext = createContext({});


export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {

  const dispatch = useDispatch()

  const { userProfile, profileLoading, profileError } = useSelector((state) => state.getuserprofile);

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(false)
  const [card, setCard] = useState(null)
  // Create a local state to store Paddle instance
  const [paddle, setPaddle] = useState();

  const togglePreview = () => {
    setPreview(!preview)
  }

  const setPreviewValues = (value) => {
    setCard(value)
  } 

  const clearPreviewValues = () => {
    setCard(null)
  }

  const checkUserEmail = async (id, userName, userEmail) => {
    try {
      console.log("search")
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('user_name', `${userName}`)

      console.log("retrieved value: ", data)

      if (data?.length) {

        console.log("retrieved value: ", data)
        console.log("not exist")

      } else {

        console.log("not exist")
        const { error } = await supabase
          .from('profiles')
          .insert({ id: id, user_name: userName, email: userEmail, date: new Date() })

        if (error) {
          toast.error('User details could not be updated.')
        }

      }

    } catch (error) {
      toast.error(error)
      return false
    }
  }

  const createCard = async (name, userId) => {

    const postId = nanoid(14)
    console.log("post id: ",postId)

    const { error } = await supabase
      .from('cards')
      .insert({ 
        creator_id: userId,
        card_id: postId,
        paid: 'free',
        card_data: {
          "template": "default",
          "cardName": "first",
          "cardTitle": "happy birthday",
          "lightTheme": "#ffffff",
          "darkTheme": "#030712",
          "titleFont": "Pacifico, cursive",
          "introText": "Start message here...",
          "coverImage": null,
          "lightText": "#ffffff",
          "darkText": "#030712",
          "birthdayMessage": "Finish message here",
          "messages": null,
          "layout": "default"
        },
        created_at: new Date()
       })
      .eq('creator_id', userId)

    if (error) {

      toast.error('User details could not be updated.')

    } else {

      toast.success(`Welcome ${name}.`)

    }

  }

  const pushToProfile = async (firstName, lastName, name, userId) => {

    const { error } = await supabase
      .from('profiles')
      .update({ first_name: firstName, last_name: lastName, user_name: name, credits: 0 })
      .eq('id', userId)

    if (error) {

      toast.error('User details could not be updated.')

    } else {

      createCard(name, userId)

    }

  }

  const signUpWithEmail = async (firstName, lastName, userName, userEmail, userPassword) => {
    try {
      setLoading(true)

      let { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword,
      })


      if (data && data?.session) {
        setLoading(false)
        console.log('user data: ', data)
        pushToProfile(firstName, lastName, userName, data.user.id)
      }

      if (error) {
        setLoading(false)
        console.log('error data: ', error.message)
        toast.error(error.message)
      }

    } catch (error) {
      setLoading(false)
      console.log('error data: ', error)
      toast.error(error.message)
    }

    setLoading(false)

  }

  const signInWithEmail = async (userEmail, userPassword) => {

    try {
      setLoading(true)

      const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword
      })

      if (data) {
        setLoading(false)
        console.log('user data: ', data)
      }

      if (error) {
        setLoading(false)
        console.log('error data: ', error)
        toast.error(error.message)
      }

    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }

    setLoading(false)

  }

  const signOut = async () => {

    const { error } = await supabase.auth.signOut()

  }

  useEffect(() => {
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      dispatch(getUserProfile(session?.user.id))
    })

    return () => authListener.subscription.unsubscribe()

  }, [])

  useEffect(() => {
    //Paddle.Environment.set("sandbox");
    initializePaddle({ 
      environment: process.env.PADDLE_ENVIRONMENT_KEY, 
      token: process.env.PADDLE_AUTH_TOKEN 
    }).then(
      (paddleInstance) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      },
    );
  }, []);

  const updateCredits = (value) => {
    console.log("credits: ",value)
  }

  const openCheckout = (priceId, email, quantity) => {

    var settings = {
      displayMode: "overlay",
      theme: "light",
      locale: "en",
      frameTarget: "checkout-container",
      frameStyle: "min-width: 600px;",
      frameInitialHeight: "450"
    };


    paddle?.Checkout.open({
      settings: settings,
      items: [{ priceId: priceId, quantity: quantity }],
      customer: {
        email: email
      },
      successCallback: updateCredits(userProfile?.credits)
    });
  };
  

  return (
    <AuthContext.Provider value={{ session, loading, preview, togglePreview, signInWithEmail, signUpWithEmail, signOut, openCheckout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }