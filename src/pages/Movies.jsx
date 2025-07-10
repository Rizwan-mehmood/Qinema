// pages/Movies.jsx
import React, { useState } from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { Frown } from 'lucide-react'
import Pagination from '../components/Pagination'

const Movies = () => {
    const itemsPerPage = 9
    const totalPages = Math.ceil(dummyShowsData.length / itemsPerPage)

    const [currentPage, setCurrentPage] = useState(1)
    const startIdx = (currentPage - 1) * itemsPerPage
    const currentItems = dummyShowsData.slice(startIdx, startIdx + itemsPerPage)

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (dummyShowsData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-3 h-screen">
                <Frown className="w-15 md:w-30 h-15 md:h-30" />
                <h1 className="text-2xl md:text-3xl font-bold text-center">
                    No movies available
                </h1>
            </div>
        )
    }

    return (
        <div className="relative mt-40 pb-60 px-6 md:px-16 lg:px-37 overflow-hidden min-h-[80vh]">
            <BlurCircle top="150px" left="0px" />
            <BlurCircle bottom="200px" right="50px" />

            <h1 className="text-lg font-medium my-4">Now Showing</h1>
            <div className="flex flex-wrap mx-auto max-w-4xl max-w-[857px] justify-center md:justify-start gap-8 mt-8">
                {currentItems.map((movie, index) => (
                    <MovieCard key={`movie-${index}`} movie={movie} />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default Movies
