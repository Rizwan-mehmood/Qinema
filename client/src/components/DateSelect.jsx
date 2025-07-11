import React, { useState, useRef, useEffect } from 'react'
import BlurCircle from './BlurCircle'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DateSelect = ({ dateTime, id }) => {
    const [selected, setSelected] = useState(null)
    const [hasOverflow, setHasOverflow] = useState(false)
    const navigate = useNavigate()
    const scrollRef = useRef(null)

    // Determine if scrollable content overflows
    const checkOverflow = () => {
        const el = scrollRef.current
        if (el) {
            setHasOverflow(el.scrollWidth > el.clientWidth)
        }
    }

    // Scroll handlers
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -scrollRef.current.clientWidth * 0.5, behavior: 'smooth' })
        }
    }
    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: scrollRef.current.clientWidth * 0.5, behavior: 'smooth' })
        }
    }

    useEffect(() => {
        // initial check and on resize
        checkOverflow()
        window.addEventListener('resize', checkOverflow)
        return () => window.removeEventListener('resize', checkOverflow)
    }, [dateTime])

    const onBookHandler = () => {
        if (!selected) {
            return toast("Please select a date")
        }
        navigate(`/movie/${id}/${selected}`)
        scrollTo(0, 0)
    }

    return (
        <div id='dateSelect' className='pt-30 mb-40'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-10 relative p-8 bg-primary/10 border border-primary/20 rounded-lg'>
                <BlurCircle top='-100px' left='-100px' />
                <BlurCircle top='100px' right='0px' />

                <div className='w-full md:w-[70%] lg:w-[75%]'>
                    <p className='text-lg font-semibold'>Choose Date</p>
                    <div className='flex items-center gap-2 text-sm mt-5'>
                        {/* left arrow if overflow */}
                        {hasOverflow && (
                            <ChevronLeftIcon
                                width={28}
                                className='cursor-pointer'
                                onClick={scrollLeft}
                            />
                        )}

                        <div
                            ref={scrollRef}
                            className='flex gap-4 w-full overflow-x-auto scroll-smooth no-scrollbar'
                        >
                            {Object.keys(dateTime).map((date, index) => (
                                <button
                                    key={`date-${index}`}
                                    onClick={() => setSelected(prev => (prev === date ? null : date))}
                                    className={
                                        `flex flex-col items-center justify-center h-12 md:h-14 w-12 md:w-14 aspect-square rounded-full md:rounded cursor-pointer
                    ${selected === date
                                            ? 'bg-primary text-white'
                                            : 'border border-primary/70'
                                        }`
                                    }
                                >
                                    <span className='text-xs md:text-sm'>{new Date(date).getDate()}</span>
                                    <span className='text-xs md:text-sm'>
                                        {new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* right arrow if overflow */}
                        {hasOverflow && (
                            <ChevronRightIcon
                                width={28}
                                className='cursor-pointer'
                                onClick={scrollRight}
                            />
                        )}
                    </div>
                </div>

                <button
                    onClick={onBookHandler}
                    className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all cursor-pointer'
                >
                    Book Now
                </button>
            </div>
        </div>
    )
}

export default DateSelect
