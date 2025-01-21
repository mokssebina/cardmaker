import React from 'react'
import { Routes, Route, Redirect, Navigate } from 'react-router-dom'
import Card from '../Pages/Card'
import Cards from '../Pages/Cards'
import NewCard from '../Pages/NewCard'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'
import Signin from '../AuthPages/Signin'
import { useAuth } from '../Context/AuthContext'


const AppRoutes = () => {

  const { session } = useAuth()

  return (
    <Routes>
      {/*
        <Route index path={'/'} element={<Navigate to='/cards' />} />
        <Route path={'/cards'} element={<Cards />} />
        <Route path={'/new-card'} element={<NewCard />} />
        <Route path={'/preview'} element={<Card />} /> 
      */}
      <Route path={'/'} element={<PublicRoutes authUser={session?.user} />}>
        <Route index path={'/'} element={<Navigate to='/signin' />} />
        <Route path={'/signin'} element={<Signin />} />
      </Route>
      
      <Route path={'/'} element={<PrivateRoutes authUser={session?.user} />}>
        <Route index path={'/'} element={<Navigate to='/cards' />} />
        <Route path={'/cards'} element={<Cards />} />
        <Route path={'/new-card'} element={<NewCard />} />
        <Route path={'/preview'} element={<Card />} />
      </Route>

    </Routes>
  )
}

export default AppRoutes