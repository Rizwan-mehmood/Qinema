import React, { useEffect, useState } from 'react'
import Title from '../../components/admin/Title'
import { dummyBookingData } from '../../assets/assets'
import Loader from '../../components/Loader'
import { dateFormat } from '../../lib/dateformat'
import toast from 'react-hot-toast'
import { useAppContext } from '../../context/AppContext'

const ListBookings = () => {
    const currency = import.meta.env.VITE_CURRENCY
    const { axios, getToken, user } = useAppContext()

    const [bookings, setBookings] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getAllBookings = async () => {
        try {
            const { data } = await axios.get("/api/admin/all-bookings", {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                setBookings(data.bookings)
            }
            else (
                toast.error(data.message)
            )

            setIsLoading(false)
        } catch (error) {
            toast.error("Error fetching bookings data", error)
        }
    }

    useEffect(() => {
        if (user) {
            getAllBookings();
        }
    }, [user])

    if (isLoading) return <Loader />

    return (
        <>
            <Title text1="List" text2="Bookings" />
            <div className='max-w-4xl mt-6 overflow-x-auto'>
                <table className='w-full min-w-[750px] border-collapse rounded-md overflow-hidden text-nowrap'>
                    <thead>
                        <tr className="bg-primary/20 text-center text-white">
                            <th className='p-2 font-medium pl-5'>User Name</th>
                            <th className='p-2 font-medium'>Movie Name</th>
                            <th className='p-2 font-medium'>Show Time</th>
                            <th className='p-2 font-medium'>Seats</th>
                            <th className='p-2 font-medium'>Amount</th>
                        </tr>
                    </thead>
                    <tbody className='text-sm text-center font-light'>
                        {bookings.map((booking, index) => (
                            <tr key={index} className='border-b border-primary/20 bg-primary/5 even:bg-primary/10'>
                                <td className='p-2 min-w-35 pl-5'>{booking.user.name}</td>
                                <td className='p-2'>{booking.show.movie.title}</td>
                                <td className='p-2'>{dateFormat(booking.show.showDateTime)}</td>
                                <td className='p-2'>{Object.keys(booking.bookedSeats).map(seat => booking.bookedSeats[seat]).join(", ")}</td>
                                <td className='p-2'>{currency} {booking.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListBookings