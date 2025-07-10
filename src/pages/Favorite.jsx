import React from 'react'
import { dummyShowsData } from '../assets/assets'
import MovieCard from '../components/MovieCard'
import BlurCircle from '../components/BlurCircle'
import { Frown } from "lucide-react"

const Favorite = () => {
    return dummyShowsData.length > 0 ? (
        <div className='relative mt-40 pb-60 px-6 md:px-16 lg:px-37 overflow-hidden min-h-[80vh]'>
            <BlurCircle top='150px' left='0px' />
            <BlurCircle bottom='200px' right='50px' />
            <h1 className='text-lg font-medium my-4'>Your Favorite Movies</h1>
            <div className='flex flex-wrap mx-auto max-w-4xl max-w-[857px] justify-center md:justify-start gap-8 mt-8'>
                {dummyShowsData.map((movie, index) => (
                    <MovieCard key={`movie-${index}`} movie={movie} />
                ))}
            </div>
        </div>
    ) : (
        <div className='flex flex-col items-center justify-center gap-3 h-screen'>
            <Frown className='w-15 md:w-30 h-15 md:h-30' />
            <h1 className='text-2xl md:text-3xl font-bold text-center'>No movies available</h1>
        </div>
    )
}

export default Favorite