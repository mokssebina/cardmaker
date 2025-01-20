import React from 'react'
import { Routes, Route, Redirect, Navigate } from 'react-router-dom'
import Card from '../Pages/Card'
import Cards from '../Pages/Cards'
import NewCard from '../Pages/NewCard'
import { PrivateRoutes } from './PrivateRoutes'


const AppRoutes = () => {
  return (
    <Routes>
      {/*
        <Route index path={'/'} element={<Navigate to='/cards' />} />
        <Route path={'/cards'} element={<Cards />} />
        <Route path={'/new-card'} element={<NewCard />} />
        <Route path={'/preview'} element={<Card />} /> 
      */}
      <Route path={'/'} element={<PrivateRoutes authUser={true} />}>
        <Route index path={'/'} element={<Navigate to='/cards' />} />
        <Route path={'/cards'} element={<Cards />} />
        <Route path={'/new-card'} element={<NewCard />} />
        <Route path={'/preview'} element={<Card />} />
      </Route>

    </Routes>
  )
}

export default AppRoutes