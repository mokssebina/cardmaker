import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from '../Components/LayoutElements/Layout'
import AppRoutes from '../Routes/Routes'
import MessageForm from '../Pages/MessageForm'



const MainStack = () => {
  return (
    <Routes>
        <Layout>
            <AppRoutes />
        </Layout>
        <Route path={'/message'} element={<MessageForm />} />
    </Routes>
  )
}

export default MainStack