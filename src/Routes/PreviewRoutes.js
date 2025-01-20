import React from 'react'
import { Routes, Route, Redirect, Navigate } from 'react-router-dom'
import MessageForm from '../Pages/MessageForm'
import Card from '../Pages/Card'




const PreviewRoutes = () => {
  return (
    <Routes>
        <Route index path={'/preview'} element={<Navigate to={'/preview/card'} />} />
        <Route path={'/preview/card'} element={<Card />} />
    </Routes>
  )
}

export default PreviewRoutes