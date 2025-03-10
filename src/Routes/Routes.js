import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import CardPreview from '../Pages/BuilderPages/CardPreview'
import Card from '../Pages/OpenPages/Card'
import Cards from '../Pages/BuilderPages/Cards'
import NewCard from '../Pages/BuilderPages/NewCard'
import MessageForm from '../Pages/OpenPages/MessageForm'
import Purchases from '../Pages/BuilderPages/Purchases'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'
import { OpenRoutes } from './OpenRoutes'
import { PrivatePreviewRoutes } from './PrivatePreviewRoutes'
import Signin from '../AuthPages/Signin'
import { useAuth } from '../Context/AuthContext'
import Signup from '../AuthPages/Signup'


const AppRoutes = () => {

  const { user, session } = useAuth()

  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      navigate(0); // Stay on the current page
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);


  return (
    <Routes>

      {/*------------------Public Routes------------------*/}
      <Route path={'/'} element={<PublicRoutes authUser={session?.user} />}>

        <Route index path={'/'} element={<Navigate to='/signin' />} />
        <Route path={'/signin'} element={<Signin />} />
        <Route path={'/signup'} element={<Signup />} />

      </Route>
      
      {/*------------------Open Routes------------------*/}
      <Route path={'/'} element={<OpenRoutes />}>

        <Route index path={'/'} element={<Navigate to='/message:card_id' />} />
        <Route index path={'/message/:card_id'} element={<MessageForm />} />
        <Route index path={'/card/:card_id'} element={<Card />} />

      </Route>
      
      {/*------------------Private Routes------------------*/}
      <Route path={'/'} element={<PrivateRoutes authUser={session?.user} />}>

        <Route index path={'/'} element={<Navigate to='/cards' />} />
        <Route path={'/cards'} element={<Cards />} />
        <Route path={'/edit-card'} element={<NewCard />} />
        <Route path={'/edit-card'} element={<NewCard />} />
        <Route path={'/purchases'} element={<Purchases />} />
        <Route path={'/preview/:card_id'} element={<CardPreview />} />

      </Route>

    </Routes>
  )
}

export default AppRoutes