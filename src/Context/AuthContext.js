import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast'
import { nanoid } from "nanoid";



const AuthContext = createContext({});


export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(false)

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
          "messages": null
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

  const pushToProfile = async (name, userId) => {

    const { error } = await supabase
      .from('profiles')
      .update({ user_name: name })
      .eq('id', userId)

    if (error) {

      toast.error('User details could not be updated.')

    } else {

      createCard(name, userId)

    }

  }

  const signUpWithEmail = async (userName, userEmail, userPassword) => {
    try {
      setLoading(true)

      let { data, error } = await supabase.auth.signUp({
        email: userEmail,
        password: userPassword,
      })


      if (data && data?.session) {
        setLoading(false)
        console.log('user data: ', data)
        pushToProfile(userName, data.user.id)
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
    })

    return () => authListener.subscription.unsubscribe()

  }, [])
  

  return (
    <AuthContext.Provider value={{ session, loading, signInWithEmail, signUpWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }