import React from 'react'
import { Routes, Route, Redirect, Navigate } from 'react-router-dom'
import CardPreview from '../Pages/CardPreview'
import Card from '../Pages/Card'
import Cards from '../Pages/Cards'
import NewCard from '../Pages/NewCard'
import MessageForm from '../Pages/MessageForm'
import Purchases from '../Pages/Purchases'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'
import { OpenRoutes } from './OpenRoutes'
import Signin from '../AuthPages/Signin'
import { useAuth } from '../Context/AuthContext'
import Signup from '../AuthPages/Signup'


const AppRoutes = () => {

  const { user, session } = useAuth()

  return (
    <Routes>
      
      <Route path={'/'} element={<PublicRoutes authUser={session?.user} />}>

        <Route index path={'/'} element={<Navigate to='/signin' />} />
        <Route path={'/signin'} element={<Signin />} />
        <Route path={'/signup'} element={<Signup />} />

      </Route>

      <Route path={'/'} element={<OpenRoutes authUser={!session?.user || session?.user} />}>

        <Route index path={'/'} element={<Navigate to='/message' />} />
        <Route index path={'/message/:card_id'} element={<MessageForm />} />
        <Route index path={'/card/:card_id'} element={<Card />} />

      </Route>
      
      <Route path={'/'} element={<PrivateRoutes authUser={session?.user} />}>

        <Route index path={'/'} element={<Navigate to='/cards' />} />
        <Route path={'/cards'} element={<Cards />} />
        <Route path={'/edit-card'} element={<NewCard />} />
        <Route path={'/edit-card'} element={<NewCard />} />
        <Route path={'/preview'} element={<CardPreview />} />
        <Route path={'/purchases'} element={<Purchases />} />
      </Route>

    </Routes>
  )
}

export default AppRoutes