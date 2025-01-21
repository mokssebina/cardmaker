import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from '../config/supabaseClient';
import { Session, User } from '@supabase/supabase-js';



const AuthContext = createContext({});


export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {

  const [session, setSession] = useState(null)

  const checkUserEmail = async (email) => {
    try {
      console.log("search")
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('email', `${email}`)

      console.log("retrieved value: ", data)

      if (data?.length) {
        console.log("retrieved value: ", data)
        console.log("not exist")
        return true
      } else {
        console.log("not exist")
        return false
      }

    } catch (error) {
      return false
    }
  }

  const signInWithEmail = async ({ email }) => {

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: checkUserEmail(email)? false : true,
          emailRedirectTo: 'http://localhost:3000/cards',
        },
      })
    } catch (error) {
      
    }

  }

  const signOut = () => {
    supabase.auth.signOut()
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ session, signInWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default { AuthContext, AuthContextProvider }