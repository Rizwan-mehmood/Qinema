import React, { useEffect, useState } from 'react'
import { dummyBookingData } from '../assets/assets'
import BlurCircle from '../components/BlurCircle'
import timeFormat from '../lib/TimeFormat'
import isoTimeFormat from '../lib/isoTimeFormat'
import { dateFormat } from '../lib/dateformat'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import Loader from '../components/Loader'
import { Frown } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const MyBookings = () => {
    const { axios, getToken, user, image_base_url } = useAppContext()
    const currency = import.meta.env.VITE_CURRENCY
    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const getMyBookings = async () => {
        try {
            const { data } = await axios.get("/api/user/bookings", {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                setBookings(data.bookings)
            }
            else {
                toast.error("Error fetching bookings data", data.message)
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        if (user) {
            getMyBookings()
        }
    }, [user])

    if (isLoading) return <Loader />

    if (bookings.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Frown className='mb-5 w-10 h-10 md:w-20 md:h-20' />
                <h2 className="text-2xl font-bold">No bookings available</h2>
                <button
                    onClick={() => { navigate('/movies'); scrollTo(0, 0) }}
                    className="mt-4 px-4 pb-2.5 pt-2 bg-primary rounded-md cursor-pointer hover:bg-primary-dull"
                >
                    Browse Movies
                </button>
            </div>
        )
    }

    return (
        <div className='relative mb-60 px-6 md:px-16 lg:px-40 pt-30 md:pt-40 min-h-[80vh]'>
            <BlurCircle top='100px' left='100px' />
            <div>
                <BlurCircle bottom='-100px' right='50px' />
            </div>

            <h1 className='text-lg font-semibold mb-4'>My Bookings</h1>

            {bookings.map((booking, index) => (
                <div key={`booking-${index}`} className='flex flex-col md:flex-row justify-between bg-primary/8 border border-primary/20 rounded-lg mt-4 p-2 max-w-3xl'>
                    <div className='flex flex-col md:flex-row'>
                        <img src={image_base_url + booking.show.movie.poster_path} alt="" className='md:max-w-45 aspect-video h-auto object-cover object-bottom rounded' />
                        <div className='flex flex-col p-4'>
                            <p className='text-lg font-semibold'>{booking.show.movie.title}</p>
                            <p className='text-gray-400 text-sm'>{timeFormat(booking.show.movie.runtime)}</p>
                            <p className='text-gray-400 text-sm mt-auto'>{dateFormat(booking.show.showDateTime)}</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:items-end md:text-right justify-between p-4'>
                        <div className='flex items-center gap-4'>
                            <p className='text-2xl font-semibold mb-3'>{currency}{booking.amount}</p>
                            {!booking.isPaid && <Link to={booking.paymentLink} className='bg-primary px-4 py-1.5 mb-3 text-sm rounded-full font-medium cursor-pointer'>Pay Now</Link>}
                        </div>
                        <div className='text-sm'>
                            <p><span className='text-gray-400'>Total Tickets: </span>{booking.bookedSeats.length}</p>
                            <p><span className='text-gray-400'>Seat Number: </span>{booking.bookedSeats.join(", ")}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyBookings