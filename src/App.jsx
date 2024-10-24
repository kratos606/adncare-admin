import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'
import './App.css'

axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true;

import Home from './pages/home';
import Login from './pages/login';
import PrivateRoute from './pages/privateRoute';
import Users from './pages/users';
import Create from './pages/users/create';
import Update from './pages/users/update';
import UpdateHeroForm from './pages/homepage/herosection';
import WelcomeForm from './pages/homepage/welcomesection';
import Images from './pages/homepage/images/images';
import Videos from './pages/homepage/videos/video';

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path='users' element={<Users />} />
            <Route path='create' element={<Create />} />
            <Route path='update/:id' element={<Update />} />
            <Route path='hero-section' element={<UpdateHeroForm />} />
            <Route path='welcome-section' element={<WelcomeForm />} />
            <Route path='images' element={<Images />} />
            <Route path='videos' element={<Videos />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App