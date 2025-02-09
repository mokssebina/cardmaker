import React, { useEffect } from 'react'
import { supabase } from '../supabase/supabaseClient'
import { useAuth } from '../Context/AuthContext'
import { toast } from 'react-hot-toast'


const Cards = () => {

  const { session } = useAuth()


  return (
    <div className='relative w-full h-full rounded-lg'></div>
  )
}

export default Cards