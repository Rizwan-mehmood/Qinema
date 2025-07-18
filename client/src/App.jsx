import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import { Toaster } from 'react-hot-toast'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'
import { AdminRoute } from './components/AdminRoute'
import Loader from './components/Loader'

const App = () => {
    const isAdminRoute = useLocation().pathname.startsWith('/admin')

    return (
        <>
            <Toaster />
            {!isAdminRoute && <Navbar />}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/movies' element={<Movies />} />
                <Route path='/movie/:id' element={<MovieDetails />} />
                <Route path='/movie/:id/:date' element={<SeatLayout />} />
                <Route path='/my-bookings' element={<MyBookings />} />
                <Route path='/loading/:nextUrl' element={<Loader />} />
                <Route path='/favorites' element={<Favorite />} />
                <Route path='/admin/*' element={<AdminRoute />}>
                    <Route index element={<Dashboard />} />
                    <Route path="add-shows" element={<AddShows />} />
                    <Route path="list-shows" element={<ListShows />} />
                    <Route path="list-bookings" element={<ListBookings />} />
                </Route>
            </Routes>
            {!isAdminRoute && <Footer />}
        </>
    )
}

export default App