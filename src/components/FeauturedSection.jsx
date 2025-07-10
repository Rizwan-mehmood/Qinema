import React, { useState } from 'react'
import { ArrowRight } from "lucide-react"
import { useNavigate } from 'react-router-dom'
import BlurCircle from './BlurCircle';
import { dummyShowsData } from '../assets/assets';
import MovieCard from './MovieCard';

const FeauturedSection = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(6);
    return (
        <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
            <div className='relative w-full flex items-center justify-between pt-20 pb-10'>
                <BlurCircle top='0' right="-80px" />
                <p className='text-gray-300 font-medium text-lg'>Now Showing</p>
                <button onClick={() => navigate("/movies")} className='group flex items-center gap-2 text-sm text-gray-300 cursor-pointer'>
                    View All
                    <ArrowRight className='group-hover:translate-x-0.5 transition w-4.5 h-4.5' />
                </button>
            </div>
            <div className='flex flex-wrap justify-center mx-auto max-w-4xl max-w-[857px] justify-center md:justify-start gap-8 mt-8'>
                {dummyShowsData.slice(0, count).map((movie, index) => (
                    <MovieCard key={`movie-${index}`} movie={movie} />
                ))}
            </div>
            {
                count < dummyShowsData.length && count < 24 ? (
                    <div className='flex justify-center mt-20'>
                        <button onClick={() => { setCount(count + 6); console.log(count, dummyShowsData.length) }} className='px-10 py-3 text-sm bg-primary hover:bg-primary-dull transistion rounded-md font-medium cursor-pointer'>Show More</button>
                    </div>
                ) : <div className='mt-30' />
            }

        </div >

    )
}

export default FeauturedSection