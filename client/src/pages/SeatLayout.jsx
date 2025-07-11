import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets'
import Loader from '../components/Loader'
import { ArrowRight, ClockIcon, Frown } from 'lucide-react'
import isoTimeFormat from '../lib/isoTimeFormat'
import BlurCircle from '../components/BlurCircle'
import toast from 'react-hot-toast'

const SeatLayout = () => {

    const groupRows = [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"], ["I", "J"]]

    const { id, date } = useParams()
    const [selectedSeats, setSelectedSeats] = useState([])
    const [selectedTime, setSelectedTime] = useState(null)
    const [show, setShow] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    const handleSeatClick = (seatId) => {
        if (!selectedTime) {
            return toast("Please select time first");
        }

        if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
            return toast("You can only select 5 seats")
        }
        setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !== seatId) : [...prev, seatId])
    }

    const renderSeats = (row, count = 9) => (
        <div key={row} className='flex gap-2 mt-2'>
            <div className="flex flex-wrap items-center justify-center gap-2">
                {Array.from({ length: count }, (_, i) => {
                    const seatId = `${row}${i + 1}`;
                    return (
                        <button key={seatId} onClick={() => handleSeatClick(seatId)} className={`h-8 w-8 rounded border border-primary/60 cursor-pointer ${selectedSeats.includes(seatId) && "bg-primary text-white"}`}>
                            {seatId}
                        </button>
                    );
                })}
            </div>
        </div>
    )

    useEffect(() => {
        setIsLoading(true)

        const timer = setTimeout(() => {
            const showData = dummyShowsData.find(show => show._id === id)

            if (showData) {
                setShow({
                    movie: showData,
                    dateTime: dummyDateTimeData
                })
            }

            setIsLoading(false)
        }, 800)

        return () => clearTimeout(timer)
    }, [id])

    if (isLoading) return <Loader />

    if (!show) return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Frown className='mb-5 w-10 h-10 md:w-20 md:h-20' />
            <h2 className="text-2xl font-bold">Something Went Wrong</h2>
            <button
                onClick={() => { navigate('/movies'); scrollTo(0, 0) }}
                className="mt-4 px-4 pb-2.5 pt-2 bg-primary rounded-md cursor-pointer hover:bg-primary-dull"
            >
                Browse Movies
            </button>
        </div>
    )

    return (
        <div className='flex flex-col md:flex-row px-6 md:px-8 lg:px-30 py-30 md:pt-50'>
            <div className='w-full md:max-w-44 bg-primary/10 border border-primary/20 rounded-lg py-3 h-max md:sticky md:top-30'>
                <p className='text-lg px-3 font-semibold'>Available Timings</p>
                <div className='flex flex-col min-[400px]:flex-row min-[400px]:items-center min-[400px]:gap-2 min-[400px]:flex-wrap py-2 min-[400px]:px-3 md:gap-0 md:flex-col md:items-start md:px-0 md:rounded-none md:rounded-r-md mt-5 space-y-1'>
                    {show.dateTime[date].map((time, index) => (
                        <div key={`time-${index}`} onClick={() => setSelectedTime(time)} className={`flex items-center min-[400px]:border min-[400px]:border-primary/40 gap-2 px-3 py-2 w-max rounded-r-md min-[400px]:rounded-md md:border-none md:rounded-none md:rounded-r-md cursor-pointer m-0 transition ${selectedTime?.time === time.time ? "bg-primary text-white" : "hover:bg-primary/20"}`}>
                            <ClockIcon className='w-4 h-4' />
                            <p className='text-sm'>{isoTimeFormat(time.time)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className='relative flex-1 flex flex-col items-center max-md:mt-16'>
                <BlurCircle top='-100px' left='-100px' />
                <BlurCircle bottom='0' right='0' />
                <h1 className='text-2xl font-semibold mb-4'>Select you seat</h1>
                <img src={assets.screenImage} alt="screen" />
                <p className='text-gray-400 text-sm mb-6'>SCREEN SIDE</p>

                <div className='flex flex-col items-center mt-10 text-xs text-gray-300'>
                    <div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
                        {groupRows[0].map(row => renderSeats(row))}
                    </div>
                    <div className='grid grid-cols-2 gap-11'>
                        {groupRows.slice(1).map((group, idx) => (
                            <div key={idx}>
                                {group.map(row => renderSeats(row))}
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={() => navigate("/my-bookings")} className='flex items-center gap-1 mt-20 px-10 py-3 text-sm bg-primary-dull transiton rounded-full font-medium cursor-pointer activate:scale-95'>
                    Proceed to Checkout
                    <ArrowRight strokeWidth={3} className='w-4 h-4' />
                </button>
            </div>
        </div>
    )
}

export default SeatLayout