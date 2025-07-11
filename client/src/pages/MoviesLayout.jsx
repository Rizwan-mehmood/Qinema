// pages/MoviesLayout.jsx
import React from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Movies from './Movies'

const MoviesLayout = () => (
    <>
        {/* common header / BlurCircles could go here if needed */}
        <Routes>
            {/* /movies → /movies/page-1 */}
            <Route index element={<Navigate to="page-1" replace />} />

            {/* /movies/page-2, page-3, etc. */}
            <Route path="page-:page" element={<Movies />} />
        </Routes>
        {/* If you had a footer specific to movies, put it here */}
        <Outlet />
    </>
)

export default MoviesLayout
